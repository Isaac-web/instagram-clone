import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class CreateFollowerDto {
  @ApiProperty({
    description: 'Id of the user about to follow another user.',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  followerId: number;

  @ApiProperty({
    description: 'Id of the user about to be followed.',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  followedId: number;
}
