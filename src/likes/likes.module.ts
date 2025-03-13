import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './providers/likes.service';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports: [UsersModule, PostsModule, TypeOrmModule.forFeature([Post])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
