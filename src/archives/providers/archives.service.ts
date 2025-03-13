import { PaginationProvider } from './../../common/pagination/providers/pagination.provider';
import { CreateArchiveProvider } from './create-archive.provider';
import { Repository } from 'typeorm';
import { CreateArchiveDto } from './../dtos/create-archive.dto';
import { Injectable } from '@nestjs/common';
import { Post } from 'src/posts/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetArchivesQueryDto } from '../dtos/get-archives-query.dto';

@Injectable()
export class ArchivesService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    private readonly createArchiveProvider: CreateArchiveProvider,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async archive(userId: number, createArchiveDto: CreateArchiveDto) {
    return this.createArchiveProvider.create(userId, createArchiveDto.postId);
  }

  public findAll(userId: number, getArchivesQueryDto: GetArchivesQueryDto) {
    return this.paginationProvider.paginate(
      this.postsRepository,
      getArchivesQueryDto,
      {
        where: {
          savedBy: {
            id: userId,
          },
        },
      },
    );
  }
}
