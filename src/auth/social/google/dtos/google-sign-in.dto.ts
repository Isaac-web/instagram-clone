import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleSignInDto {
  @ApiProperty({
    description: 'A valid google sign in token.',
  })
  @IsString()
  token: string;
}
