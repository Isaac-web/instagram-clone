import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email of the user.',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user.',
    example: '<Input User Password>',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
