import { CreateProfileProvider } from './create-profile.provider';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { FindProfilesProvider } from './find-profiles.provider';
import { UpdateProfileProvider } from './update-profile.provider';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,

    private readonly findProfilesProvider: FindProfilesProvider,

    private readonly createProfileProvider: CreateProfileProvider,

    private readonly updateProfileProvider: UpdateProfileProvider,
  ) {}

  public async create(createProfileDto: CreateProfileDto) {
    return this.createProfileProvider.create(createProfileDto);
  }

  public findAll() {
    return this.findProfilesProvider.findAll();
  }

  public findById(id: number) {
    return this.findProfilesProvider.findByIdOrThrow(id);
  }

  public async update(id: number, patchProfileDto: PatchProfileDto) {
    return this.updateProfileProvider.update(id, patchProfileDto);
  }

  public async delete(id: number) {
    const profile = await this.findById(id);

    try {
      return this.profilesRepository.remove(profile);
    } catch {
      throw new RequestTimeoutException(
        'Cannot upadate profile at the moment. Please try again later.',
      );
    }
  }
}
