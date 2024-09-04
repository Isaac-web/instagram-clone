import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    await Promise.all([
      this.checkDupliateEmail(createUserDto.email),
      this.checkDupliateUsername(createUserDto.username),
    ]);

    const user = this.usersRepository.create(createUserDto);

    try {
      return await this.usersRepository.save(user);
    } catch {
      throw new RequestTimeoutException(
        'Cannot create a user at the moment. Please try again later.',
      );
    }
  }

  public async checkDupliateEmail(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (user) throw new BadRequestException('Username is already taken.');
  }

  public async checkDupliateUsername(username: string) {
    const user = await this.usersRepository.findOneBy({
      username,
    });

    if (user) throw new BadRequestException('Username is already taken.');
  }
}
