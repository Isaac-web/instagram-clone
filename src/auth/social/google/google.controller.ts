import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GoogleSignInDto } from './dtos/google-sign-in.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-types.enum';
import { GoogleService } from './providers/google.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Google OAuth')
@Controller('auth/google')
export class GoogleController {
  constructor(private readonly googleAuthService: GoogleService) {}

  @ApiOperation({
    summary: 'Authenticates a user with google.',
  })
  @ApiResponse({
    status: 200,
    description: 'User signed successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid google tokenId.',
  })
  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public authenticate(@Body() googleSignInDto: GoogleSignInDto) {
    return this.googleAuthService.authenticate(googleSignInDto);
  }
}
