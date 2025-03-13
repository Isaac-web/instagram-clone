import { ArchivesService } from './providers/archives.service';
import { CreateArchiveDto } from './dtos/create-archive.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-types.enum';
import { User } from 'src/users/entities/user.entity';
import { GetArchivesQueryDto } from './dtos/get-archives-query.dto';

@Controller('archives')
export class ArchivesController {
  constructor(private readonly archivesService: ArchivesService) {}
  @Post()
  @Auth(AuthType.Bearer)
  public create(
    @ActiveUser() user: User,
    @Body() createArchiveDto: CreateArchiveDto,
  ) {
    return this.archivesService.archive(user.id, createArchiveDto);
  }

  @Get()
  @Auth(AuthType.Bearer)
  public findAll(
    @ActiveUser('id') userId: number,
    @Query() getArchivesQueryDto: GetArchivesQueryDto,
  ) {
    return this.archivesService.findAll(userId, getArchivesQueryDto);
  }
}
