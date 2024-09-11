import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './providers/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentProvider } from './providers/create-comment.provider';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { FindCommentsProvider } from './providers/find-comments.provider';
import { UpdateCommentsProvider } from './providers/update-comments.provider';
import { DeleteCommentProvider } from './providers/delete-comment.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, PostsModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CreateCommentProvider,
    FindCommentsProvider,
    UpdateCommentsProvider,
    DeleteCommentProvider,
  ],
})
export class CommentsModule {}
