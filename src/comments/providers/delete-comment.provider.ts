import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { FindCommentsProvider } from './find-comments.provider';

@Injectable()
export class DeleteCommentProvider {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    private readonly findCommentsProvider: FindCommentsProvider,
  ) {}

  public async delete(id: number) {
    const comment = await this.findCommentsProvider.findByIdOrThrow(id);

    try {
      return await this.commentsRepository.remove(comment);
    } catch {
      throw new RequestTimeoutException(
        'Cannot delete comment at the moment. Please try again later.',
      );
    }
  }
}
