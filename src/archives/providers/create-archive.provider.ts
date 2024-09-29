import { Repository } from 'typeorm';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Post } from 'src/posts/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateArchiveProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postsRespository: Repository<Post>,
  ) {}

  public async create(userId: number, postId: number) {
    try {
      const isArchived = await this.isArchived(userId, postId);

      if (isArchived) {
        await this.postsRespository
          .createQueryBuilder()
          .relation(Post, 'savedBy')
          .of(userId)
          .remove(postId);

        return { message: 'Post was unsaved.' };
      } else {
        await this.postsRespository
          .createQueryBuilder()
          .relation(Post, 'savedBy')
          .of(userId)
          .add(postId);

        return { message: 'Post was saved successfully.' };
      }
    } catch (err) {
      console.log(err);
      throw new RequestTimeoutException(
        'Cannot perform archive operation at the moment. Please try again later.',
      );
    }
  }

  private async isArchived(userId: number, postId: number) {
    return this.postsRespository
      .createQueryBuilder('post')
      .leftJoin('post.savedBy', 'user')
      .where('post.id = :postId', { postId })
      .andWhere('user.id = :userId', { userId })
      .getOne();
  }
}
