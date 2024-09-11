import { FindCommentsProvider } from './find-comments.provider';
import { FindUserProvider } from 'src/users/providers/find-user.provider';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { PatchCommentDto } from '../dtos/patch-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdateCommentsProvider {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    private readonly findCommentsProvider: FindCommentsProvider,
  ) {}

  public async udpate(id: number, patchCommentDto: PatchCommentDto) {
    //TODO: Ensure the current user owns the comment.

    const comment = await this.findCommentsProvider.findByIdOrThrow(id);

    comment.content = patchCommentDto.content ?? comment.content;

    try {
      return await this.commentsRepository.save(comment);
    } catch {
      throw new RequestTimeoutException(
        'Cannot update comment at the moment. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }
}
