import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'integer',
    description: 'The Id of the user.',
    example: 1,
  })
  userId: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Bio of the the user the profile belongs to.',
    example: 'A very simple bio...',
  })
  bio?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Url to the profile photo.',
    example: 'http://localhost/sample_url.png',
  })
  profileImage?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Url to the cover photo.',
    example: 'http://localhost/sample_url.png',
  })
  coverPhoto?: string;
}
