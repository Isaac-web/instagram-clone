import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @IsPositive()
  @IsOptional()
  limit?: number = 10;
}
