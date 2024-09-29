import { ObjectLiteral } from 'typeorm';
import { PaginationQueryDto } from './../dto/pagination-query.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  public async paginateQuery<T extends ObjectLiteral>(
    repository: T,
    paginationQueryDto: PaginationQueryDto,
  ) {
    const data = await repository.find({
      relations: { author: true },
      skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
      take: paginationQueryDto.limit,
    });

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQueryDto.limit);

    const nextPage =
      totalPages === paginationQueryDto.page
        ? paginationQueryDto.page
        : paginationQueryDto.page + 1;

    const previousPage =
      paginationQueryDto.page === 1
        ? paginationQueryDto.page
        : paginationQueryDto.page - 1;

    const baseUrl = `${this.request.protocol}://${this.request.headers.host}/`;
    const url = new URL(this.request.url, baseUrl);

    url.searchParams.set('limit', paginationQueryDto.limit.toString());

    const firstPageUrl = new URL(url);
    firstPageUrl.searchParams.set('page', '1');

    const lastPageUrl = new URL(url);
    lastPageUrl.searchParams.set('page', totalPages.toString());

    const nextUrl = new URL(url);
    nextUrl.searchParams.set('page', nextPage.toString());

    const prevUrl = new URL(url);
    prevUrl.searchParams.set('page', previousPage.toString());

    const currentUrl = new URL(url);
    currentUrl.searchParams.set('page', paginationQueryDto.page.toString());

    const paginatedResponse: Paginated<T> = {
      data,
      meta: {
        totalPages,
        itemsPerPage: paginationQueryDto.limit,
        currentPage: paginationQueryDto.page,
        totalItems,
      },
      links: {
        first: lastPageUrl.toString(),
        last: lastPageUrl.toString(),
        current: currentUrl.toString(),
        next: nextUrl.toString(),
        prev: prevUrl.toString(),
      },
    };

    return paginatedResponse;
  }
}
