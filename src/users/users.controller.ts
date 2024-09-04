import { UsersService } from './providers/users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  public findAll() {
    return this.usersService.find();
  }

  @Get('/:id')
  public findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.findById(id);
  }

  @Patch('/:id')
  public update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() patchUserDto: PatchUserDto,
  ) {
    return this.usersService.update(id, patchUserDto);
  }

  @Delete('/:id')
  public delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }
}
