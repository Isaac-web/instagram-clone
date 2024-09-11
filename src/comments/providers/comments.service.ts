import { DeleteCommentProvider } from './delete-comment.provider';
import { UpdateCommentsProvider } from './update-comments.provider';
import { FindCommentsProvider } from './find-comments.provider';
import { Injectable } from '@nestjs/common';
import { CreateCommentProvider } from './create-comment.provider';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { PatchCommentDto } from '../dtos/patch-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly createCommentProvider: CreateCommentProvider,

    private readonly findCommentsProvider: FindCommentsProvider,

    private readonly updateCommentsProvider: UpdateCommentsProvider,

    private readonly deleteCommentProvider: DeleteCommentProvider,
  ) {}

  public create(createCommentDto: CreateCommentDto) {
    return this.createCommentProvider.create(createCommentDto);
  }

  public findAll(postId: number) {
    return this.findCommentsProvider.findAll(postId);
  }

  public findById(id: number) {
    return this.findCommentsProvider.findbyId(id);
  }

  public update(id: number, patchCommentDto: PatchCommentDto) {
    return this.updateCommentsProvider.udpate(id, patchCommentDto);
  }

  public delete(id: number) {
    return this.deleteCommentProvider.delete(id);
  }
}
