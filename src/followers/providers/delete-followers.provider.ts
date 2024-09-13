import { FindFollowersProvider } from './find-followers.provider';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Follower } from '../entities/follower.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteFollowersProvider {
  constructor(
    @InjectRepository(Follower)
    private readonly followersRepository: Repository<Follower>,

    private findFollowersProvider: FindFollowersProvider,
  ) {}

  public async delete(id: number) {
    const follower = await this.findFollowersProvider.findByIdOrThrow(id);

    try {
      return this.followersRepository.remove(follower);
    } catch {
      throw new RequestTimeoutException(
        'Something went wrong while unfollowing the given user. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }
}
