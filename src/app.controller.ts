import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthType } from './auth/enums/auth-types.enum';
import { Auth } from './auth/decorators/auth.decorator';

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns "Hello World"',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users returned successfully.',
  })
  @Auth(AuthType.None)
  getHello(): string {
    return this.appService.getHello();
  }
}
