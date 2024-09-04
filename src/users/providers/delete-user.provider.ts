import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserProvider } from './find-user.provider';

@Injectable()
export class DeleteUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly findUserProvider: FindUserProvider,
  ) {}

  public async delete(id: number) {
    const user = await this.findUserProvider.findByIdOrThrow(id);

    try {
      return await this.usersRepository.remove(user);
    } catch {
      throw new RequestTimeoutException(
        'Cannot delete user at the moment. Please try again later.',
      );
    }
  }
}
