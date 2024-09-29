import { UpdatePostProvider } from './update-post.provider';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { CreatePostProvider } from './create-post.provider';
import { FindPostsProvider } from './find-posts.provider';
import { DeletePostProvider } from './delete-post.provider';
import { GetPostQueryDto } from '../dtos/get-post-query.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly createPostProvider: CreatePostProvider,

    private readonly findPostsProvider: FindPostsProvider,

    private readonly updatePostProvider: UpdatePostProvider,

    private readonly deletePostProvider: DeletePostProvider,
  ) {}

  public create(createPostDto: CreatePostDto) {
    return this.createPostProvider.create(createPostDto);
  }

  public findAll(getPostQueryDto: GetPostQueryDto) {
    return this.findPostsProvider.findAll(getPostQueryDto);
  }

  public findById(id: number) {
    return this.findPostsProvider.findByIdOrThrow(id);
  }

  public update(id: number, patchPostDto: PatchPostDto) {
    return this.updatePostProvider.update(id, patchPostDto);
  }

  public delete(id: number) {
    return this.deletePostProvider.delete(id);
  }
}
