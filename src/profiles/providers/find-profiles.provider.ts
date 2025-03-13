import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindProfilesProvider {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  public findAll() {
    try {
      return this.profilesRepository.find();
    } catch {
      throw new RequestTimeoutException(
        'Cannot retrieve profiles at the moment. Please try again.',
        { description: 'Could not connect to the database.' },
      );
    }
  }

  public findById(id: number) {
    try {
      return this.profilesRepository.findOne({
        where: { id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Cannot retrieve profiles at the moment. Please try again.',
        { description: 'Could not connect to the database.' },
      );
    }
  }

  public async findByIdOrThrow(id: number) {
    const profile = await this.findById(id);

    if (!profile)
      throw new NotFoundException(
        'The profile with the given id cannot be found.',
      );

    return profile;
  }

  public findbyUserId(userId: number) {
    try {
      return this.profilesRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
      });
    } catch {
      throw new RequestTimeoutException(
        'Cannot retrieve profiles at the moment. Please try again.',
        { description: 'Could not connect to the database.' },
      );
    }
  }
}
