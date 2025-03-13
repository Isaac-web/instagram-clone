import { FindUserProvider } from './../../users/providers/find-user.provider';
import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Follower } from '../entities/follower.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindFollowersProvider {
  constructor(
    @InjectRepository(Follower)
    private readonly followersRepository: Repository<Follower>,

    private readonly findUserProvider: FindUserProvider,
  ) {}
  //find all
  public async findAll(userId: number) {
    const user = await this.findUserProvider.findByIdOrThrow(userId);

    try {
      return this.followersRepository.find({
        where: {
          followed: user,
        },
      });
    } catch {
      throw new RequestTimeoutException(
        'Cannot fetch followers at the moment. Please try again later.',
      );
    }
  }

  public findById(id: number) {
    try {
      return this.followersRepository.findOne({
        where: {
          id,
        },
      });
    } catch {
      throw new RequestTimeoutException(
        'An error occured while fetching the given follower. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }

  public async findByIdOrThrow(id: number) {
    const follower = await this.findById(id);
    if (!follower)
      throw new NotFoundException(
        'Follower with the given id cannot be found.',
      );

    return follower;
  }
}
