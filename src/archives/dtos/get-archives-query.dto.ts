import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

class GetArchivesBaseQueryDto {}

export class GetArchivesQueryDto extends IntersectionType(
  PaginationQueryDto,
  GetArchivesBaseQueryDto,
) {}
