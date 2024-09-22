import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class LikePostDto {
  @ApiProperty({
    example: 1,
    description: 'Id of the post to being liked or unliked.',
  })
  @IsInt()
  @IsNotEmpty()
  postId: number;
}
