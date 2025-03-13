import { FindUserProvider } from 'src/users/providers/find-user.provider';
import { FindPostsProvider } from './../../posts/providers/find-posts.provider';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Injectable()
export class CreateCommentProvider {
  constructor(
    private readonly findPostsProvider: FindPostsProvider,

    private readonly findUserProvider: FindUserProvider,

    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  public async create(createCommentDto: CreateCommentDto) {
    const [user, post] = await Promise.all([
      this.findUserProvider.findByIdOrThrow(createCommentDto.userId),
      this.findPostsProvider.findByIdOrThrow(createCommentDto.postId),
    ]);

    const comment = this.commentsRepository.create({
      user,
      post,
      content: createCommentDto.content,
    });

    try {
      return await this.commentsRepository.save(comment);
    } catch {
      throw new RequestTimeoutException(
        'Cannot post comment at the moment. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }
}
