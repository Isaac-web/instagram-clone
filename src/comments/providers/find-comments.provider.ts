import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindCommentsProvider {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  public findAll(postId: number) {
    try {
      return this.commentsRepository.find({
        where: {
          post: {
            id: postId,
          },
        },
      });
    } catch {
      throw new RequestTimeoutException(
        'Cannot fetch comments at the moment. Please try again.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }

  public findbyId(id: number) {
    try {
      return this.commentsRepository.findOne({
        where: { id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Cannot fetch comment at the moment. Please try again later.',
        {
          description: 'Could not connec to the database.',
        },
      );
    }
  }

  public async findByIdOrThrow(id: number) {
    const comment = await this.findbyId(id);

    if (!comment)
      throw new NotFoundException('Comment with the given id cannot be found.');

    return comment;
  }
}
