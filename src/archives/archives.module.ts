import { Module } from '@nestjs/common';
import { ArchivesController } from './archives.controller';
import { ArchivesService } from './providers/archives.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { CreateArchiveProvider } from './providers/create-archive.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), PaginationModule],
  controllers: [ArchivesController],
  providers: [ArchivesService, CreateArchiveProvider],
})
export class ArchivesModule {}
