import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class CreateProfileProvider {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,

    private readonly usersService: UsersService,
  ) {}

  public async create(createProfileDto: CreateProfileDto) {
    const user = await this.usersService.findById(createProfileDto.userId);

    const profile = this.profilesRepository.create({
      ...createProfileDto,
      user,
    });

    try {
      return await this.profilesRepository.save(profile);
    } catch {
      throw new RequestTimeoutException(
        'Cannot create a profile at the moment. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }
}
