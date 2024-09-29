import { PaginationProvider } from './../../common/pagination/providers/pagination.provider';
import { GetPostQueryDto } from './../dtos/get-post-query.dto';
import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindPostsProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public findAll(getPostQueryDto: GetPostQueryDto) {
    try {
      return this.paginationProvider.paginateQuery(
        this.postsRepository,
        getPostQueryDto,
      );
      // return this.postsRepository.find({
      //   relations: { author: true },
      //   skip: (getPostQueryDto.page - 1) * getPostQueryDto.limit,
      //   take: getPostQueryDto.limit,
      // });
    } catch {
      throw new RequestTimeoutException(
        'Cannot retreive posts at the moment. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }

  public findById(id: number) {
    try {
      return this.postsRepository.findOne({
        where: { id },
        relations: { author: true },
      });
    } catch {
      throw new RequestTimeoutException(
        'Cannot retreive post at the moment. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }

  public async findByIdOrThrow(id: number) {
    const post = await this.findById(id);

    if (!post)
      throw new NotFoundException(
        'The post with the given id cannot be found.',
      );

    return post;
  }
}
