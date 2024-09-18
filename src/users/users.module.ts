import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserProvider } from './providers/find-user.provider';
import { UpdateUserProvider } from './providers/update-user.provider';
import { DeleteUserProvider } from './providers/delete-user.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserProvider,
    FindUserProvider,
    UpdateUserProvider,
    DeleteUserProvider,
  ],
  exports: [UsersService, FindUserProvider, CreateUserProvider],
})
export class UsersModule {}
