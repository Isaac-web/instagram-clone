import { ProfilesService } from './providers/profiles.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { PatchProfileDto } from './dtos/patch-profile.dto';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user profile.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New profile created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'User already has an existing profile or invalid profile data.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns a list of profiles.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of profiles returned successfully.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public findAll() {
    return this.profilesService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Returns a profile with a given id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile found and returned successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Profile with the given id could not be found.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.profilesService.findById(id);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Updates a profile with a given id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile with the given id updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid profile data.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Profile with the given id could not be found.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public update(
    @Param('id') id: number,
    @Body() patchProfileDto: PatchProfileDto,
  ) {
    return this.profilesService.update(id, patchProfileDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Deletes a profile with a given id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile with the given id deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Profile with the given id could not be found.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public delete(@Param('id') id: number) {
    return this.profilesService.delete(id);
  }
}
