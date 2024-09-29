import { IntersectionType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

class GetPostBaseQueryDto {
  @IsNumber()
  @IsOptional()
  userId?: number;
}

export class GetPostQueryDto extends IntersectionType(
  PaginationQueryDto,
  GetPostBaseQueryDto,
) {}
