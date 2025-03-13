import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Id of the user commenting on the post.',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Id of the post been commented on.',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  postId: number;

  @ApiProperty({
    description: 'Text content of the post.',
    example: 'Awesome post...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
