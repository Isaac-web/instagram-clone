import { DeleteFollowersProvider } from './delete-followers.provider';
import { FindFollowersProvider } from './find-followers.provider';
import { CreateFollowerDto } from '../dtos/create-follower.dto';
import { CreateFollowerProvider } from './create-follower.provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FollowersService {
  constructor(
    private readonly createFollowerProvider: CreateFollowerProvider,

    private readonly findFollowersProvider: FindFollowersProvider,

    private readonly deleteFollowersProvider: DeleteFollowersProvider,
  ) {}

  public create(createFollowerDto: CreateFollowerDto) {
    return this.createFollowerProvider.create(createFollowerDto);
  }

  public findAll(userId: number) {
    return this.findFollowersProvider.findAll(userId);
  }

  public findById(id: number) {
    return this.findFollowersProvider.findByIdOrThrow(id);
  }

  public delete(id: number) {
    return this.deleteFollowersProvider.delete(id);
  }
}
