import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './providers/profiles.service';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindProfilesProvider } from './providers/find-profiles.provider';
import { CreateProfileProvider } from './providers/create-profile.provider';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Profile])],
  controllers: [ProfilesController],
  providers: [ProfilesService, FindProfilesProvider, CreateProfileProvider],
})
export class ProfilesModule {}
