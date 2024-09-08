import { CreateProfileProvider } from './create-profile.provider';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { FindProfilesProvider } from './find-profiles.provider';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,

    private readonly findProfilesProvider: FindProfilesProvider,

    private readonly createProfileProvider: CreateProfileProvider,
  ) {}

  public async create(createProfileDto: CreateProfileDto) {
    return await this.createProfileProvider.create(createProfileDto);
  }

  public findAll() {
    return this.findProfilesProvider.findAll();
  }

  public findById(id: number) {
    return this.findProfilesProvider.findByIdOrThrow(id);
  }

  public async update(id: number, patchProfileDto: PatchProfileDto) {
    const profile = await this.findProfilesProvider.findByIdOrThrow(id);

    profile.bio = patchProfileDto.bio ?? profile.bio;
    profile.profileImage = patchProfileDto.profileImage ?? profile.profileImage;
    profile.coverPhoto = patchProfileDto.coverPhoto ?? profile.coverPhoto;

    try {
      return this.profilesRepository.save(profile);
    } catch {
      throw new RequestTimeoutException(
        'Cannot upadate profile at the moment. Please try again later.',
      );
    }
  }

  public async delete(id: number) {
    const profile = await this.findProfilesProvider.findByIdOrThrow(id);

    try {
      return this.profilesRepository.remove(profile);
    } catch {
      throw new RequestTimeoutException(
        'Cannot upadate profile at the moment. Please try again later.',
      );
    }
  }
}
