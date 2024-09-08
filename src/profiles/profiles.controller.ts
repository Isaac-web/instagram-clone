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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  })
  public create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  public findAll() {
    return this.profilesService.findAll();
  }

  @Get('/:id')
  public findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.profilesService.findById(id);
  }

  @Patch('/:id')
  public update(
    @Param('id') id: number,
    @Body() patchProfileDto: PatchProfileDto,
  ) {
    return this.profilesService.update(id, patchProfileDto);
  }

  @Delete('/:id')
  public delete(@Param('id') id: number) {
    return this.profilesService.delete(id);
  }
}
