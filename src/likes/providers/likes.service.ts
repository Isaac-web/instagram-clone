import { FindUserProvider } from 'src/users/providers/find-user.provider';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindPostsProvider } from 'src/posts/providers/find-posts.provider';
import { LikePostDto } from '../dtos/like-post.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    private readonly findUserProvider: FindUserProvider,

    private readonly findPostsProvider: FindPostsProvider,
  ) {}
  async toggleLikePost(likePostDto: LikePostDto, userId: number) {
    const postId = likePostDto.postId;

    await Promise.all([
      this.findUserProvider.findByIdOrThrow(userId),
      this.findPostsProvider.findByIdOrThrow(postId),
    ]);

    const existingLike = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoin('post.likes', 'like')
      .where('post.id = :postId', { postId })
      .andWhere('like.id = :userId', { userId })
      .getOne();

    if (existingLike) {
      await this.postsRepository
        .createQueryBuilder()
        .relation(Post, 'likes')
        .of(postId)
        .remove(userId);

      return { message: 'Post unliked successfully' };
    } else {
      await this.postsRepository
        .createQueryBuilder()
        .relation(Post, 'likes')
        .of(postId)
        .add(userId);

      return { message: 'Post liked successfully' };
    }
  }
}
