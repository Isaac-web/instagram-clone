import { Repository } from 'typeorm';
import { PatchPostDto } from './../dtos/patch-post.dto';
import { FindPostsProvider } from './find-posts.provider';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdatePostProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    private readonly findPostsProvider: FindPostsProvider,
  ) {}

  public async update(id: number, patchPostDto: PatchPostDto) {
    const post = await this.findPostsProvider.findByIdOrThrow(id);

    post.caption = patchPostDto.caption ?? post.caption;
    post.mediaUrl = patchPostDto.mediaUrl ?? post.mediaUrl;
    post.location = patchPostDto.location ?? post.location;

    try {
      return await this.postsRepository.save(post);
    } catch {
      throw new RequestTimeoutException(
        'Cannot update post at the moment. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }
}
