import { UsersService } from './providers/users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new user.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User was created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user data.',
  })
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Returns a list of registered users.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users returned successfully.',
  })
  public findAll() {
    return this.usersService.find();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Returns a user with a given id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User returned successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with the given id not found.',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Id of the user.',
    example: 1,
  })
  public findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.findById(id);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Updates a user with a given id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User returned successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with the given id not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user data.',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Id of the user.',
    example: 1,
  })
  public update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() patchUserDto: PatchUserDto,
  ) {
    return this.usersService.update(id, patchUserDto);
  }

  @ApiOperation({
    summary: 'Deletes a user with a given id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with the given id not found.',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Id of the user.',
    example: 1,
  })
  @Delete('/:id')
  public delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }
}
