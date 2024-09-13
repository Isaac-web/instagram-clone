import { AuthService } from './providers/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Allows a user to sign in with their email and password.',
  })
  @ApiResponse({
    status: 200,
    description: 'User signed in successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email or password.',
  })
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
