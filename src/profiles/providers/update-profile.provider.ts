import { FindProfilesProvider } from './find-profiles.provider';
import { Repository } from 'typeorm';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Profile } from '../entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchProfileDto } from '../dtos/patch-profile.dto';

@Injectable()
export class UpdateProfileProvider {
  constructor(
    private readonly findProfilesProvider: FindProfilesProvider,

    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  public async update(id: number, patchProfileDto: PatchProfileDto) {
    const profile = await this.findProfilesProvider.findById(id);

    //TODO: Confirm if the profile belongs to the current user.

    profile.bio = patchProfileDto.bio ?? profile.bio;
    profile.coverPhoto = patchProfileDto.coverPhoto ?? profile.coverPhoto;
    profile.profileImage = patchProfileDto.profileImage ?? profile.profileImage;

    try {
      return await this.profilesRepository.save(profile);
    } catch {
      throw new RequestTimeoutException(
        'Cannot update profile at the moment. Please try again later.',
      );
    }
  }
}
