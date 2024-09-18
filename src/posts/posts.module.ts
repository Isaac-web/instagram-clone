import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CreatePostProvider } from './providers/create-post.provider';
import { UsersModule } from 'src/users/users.module';
import { FindPostsProvider } from './providers/find-posts.provider';
import { UpdatePostProvider } from './providers/update-post.provider';
import { DeletePostProvider } from './providers/delete-post.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule, AuthModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    CreatePostProvider,
    FindPostsProvider,
    UpdatePostProvider,
    DeletePostProvider,
  ],
  exports: [FindPostsProvider],
})
export class PostsModule {}
