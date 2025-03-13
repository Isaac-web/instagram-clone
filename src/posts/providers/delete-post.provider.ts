import { FindPostsProvider } from './find-posts.provider';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeletePostProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    private readonly findPostsProvider: FindPostsProvider,
  ) {}

  public async delete(id: number) {
    const post = await this.findPostsProvider.findByIdOrThrow(id);

    try {
      return await this.postsRepository.remove(post);
    } catch {
      throw new RequestTimeoutException(
        'Cannot delete post at the moment. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }
}
