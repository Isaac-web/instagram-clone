import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findAll() {
    try {
      return await this.usersRepository.find();
    } catch {
      throw new RequestTimeoutException(
        'Cannot retreive users at the moment. Please try again later.',
      );
    }
  }

  public async findById(id: number) {
    try {
      return await this.usersRepository.findOne({
        where: { id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Cannot retreive user at the moment. Please try again later.',
      );
    }
  }

  public async findByIdOrThrow(id: number) {
    const user = await this.findById(id);

    if (!user)
      throw new NotFoundException(
        'The user with the given id cannot be found.',
      );

    return user;
  }

  public async findByEmail(email: string) {
    try {
      return await this.usersRepository.findOne({
        where: { email },
      });
    } catch {
      throw new RequestTimeoutException(
        'Cannot retreive user at the moment. Please try again later.',
      );
    }
  }

  public async findByGoogleId(googleId: string) {
    try {
      return await this.usersRepository.findOneBy({ googleId });
    } catch {
      throw new RequestTimeoutException(
        'Cannot retreive user at the moment. Please try again later.',
      );
    }
  }

  public async findByUsername(username: string) {
    try {
      return await this.usersRepository.findOne({
        where: { username },
      });
    } catch {
      throw new RequestTimeoutException(
        'Cannot retreive user at the moment. Please try again later.',
      );
    }
  }
}
