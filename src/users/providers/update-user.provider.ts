import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserProvider } from './find-user.provider';
import { PatchUserDto } from '../dtos/patch-user.dto';

@Injectable()
export class UpdateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly findUserProvider: FindUserProvider,
  ) {}

  public async update(id: number, patchUserDto: PatchUserDto) {
    const user = await this.findUserProvider.findByIdOrThrow(id);

    if (patchUserDto.username) {
      const existingUser = await this.findUserProvider.findByUsername(
        patchUserDto.username,
      );
      if (existingUser)
        throw new BadRequestException('The given username is already taken.');
    }

    user.name = patchUserDto.name ?? user.name;

    try {
      return await this.usersRepository.save(user);
    } catch {
      throw new RequestTimeoutException(
        'Cannot update user at this moment. Please try again later.',
      );
    }
  }
}
