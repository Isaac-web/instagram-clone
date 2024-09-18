import { FindUserProvider } from 'src/users/providers/find-user.provider';
import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashProvider } from 'src/auth/providers/hash.provider';
import { GoogleUserData } from 'src/auth/social/google/interfaces/google-user-data.interface';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly hashProvider: HashProvider,

    private readonly findUserProvider: FindUserProvider,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    await Promise.all([
      this.checkDupliateEmail(createUserDto.email),
      this.checkDupliateUsername(createUserDto.username),
    ]);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashProvider.hash(createUserDto.password),
    });

    try {
      return await this.usersRepository.save(user);
    } catch {
      throw new RequestTimeoutException(
        'Cannot create a user at the moment. Please try again later.',
      );
    }
  }

  public async createGoogleUser(googleUserData: GoogleUserData) {
    await this.checkDupliateGoogleId(googleUserData.googleId);

    const user = this.usersRepository.create(googleUserData);

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
  public async checkDupliateGoogleId(googleId: string) {
    const user = await this.findUserProvider.findByGoogleId(googleId);

    if (user)
      throw new BadRequestException(
        'User with the given google Id already exists.',
      );
  }

  public async checkDupliateUsername(username: string) {
    const user = await this.usersRepository.findOneBy({
      username,
    });

    if (user) throw new BadRequestException('Username is already taken.');
  }
}
