import { FindUserProvider } from './../../users/providers/find-user.provider';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Follower } from '../entities/follower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFollowerDto } from '../dtos/create-follower.dto';

@Injectable()
export class CreateFollowerProvider {
  constructor(
    @InjectRepository(Follower)
    private readonly followersRepository: Repository<Follower>,

    private readonly findUserProvider: FindUserProvider,
  ) {}

  public async create(createFollowerDto: CreateFollowerDto) {
    const [follower, followed] = await Promise.all([
      this.findUserProvider.findByIdOrThrow(createFollowerDto.followerId),
      this.findUserProvider.findByIdOrThrow(createFollowerDto.followedId),
    ]);

    const newFollower = this.followersRepository.create({
      followed,
      follower,
    });

    try {
      return await this.followersRepository.save(newFollower);
    } catch {
      throw new RequestTimeoutException(
        'Something went wrong while try to follow the given user. Please try again later.',
        {
          description: 'Could not connect to the database,',
        },
      );
    }
  }
}
