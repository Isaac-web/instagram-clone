import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: 'integer',
    description: 'Id of the user.',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiPropertyOptional({
    description: 'Caption of the post.',
    example: 'This is an amazing post...',
  })
  @IsString()
  @IsOptional()
  @MaxLength(5120)
  caption?: string;

  @ApiPropertyOptional({
    description: 'Caption of the post.',
    example: 'https://s3.aws.com/some-random-bucket/path-to-file/image.jpg',
  })
  @IsString()
  @IsOptional()
  @MaxLength(1024)
  mediaUrl?: string;

  @ApiPropertyOptional({
    description: 'Optional location about the post.',
    example: 'New York City, NYC',
  })
  @IsString()
  @IsOptional()
  location?: string;
}
