import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateArchiveDto {
  @ApiProperty({
    description: 'The id of the post to be archived.',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  postId: number;
}
