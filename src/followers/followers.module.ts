import { Module } from '@nestjs/common';
import { FollowersController } from './followers.controller';
import { FollowersService } from './providers/followers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';
import { CreateFollowerProvider } from './providers/create-follower.provider';
import { FindFollowersProvider } from './providers/find-followers.provider';
import { DeleteFollowersProvider } from './providers/delete-followers.provider';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Follower]), UsersModule],
  controllers: [FollowersController],
  providers: [
    FollowersService,
    CreateFollowerProvider,
    FindFollowersProvider,
    DeleteFollowersProvider,
  ],
})
export class FollowersModule {}
