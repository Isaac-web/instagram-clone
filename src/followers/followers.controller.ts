import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFollowerDto } from './dtos/create-follower.dto';
import { FollowersService } from './providers/followers.service';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Followers')
@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post()
  @ApiOperation({
    summary: 'Allows a user to follow another user',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully followed another user.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data.',
  })
  @ApiResponse({
    status: 404,
    description: 'User about to be followed cannot be found.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public create(@Body() createFollowerDto: CreateFollowerDto) {
    return this.followersService.create(createFollowerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Returns a list of followers of a given user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Followers returned successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'User with the given userId could not be found.',
  })
  @ApiQuery({
    name: 'userId',
    type: 'integer',
    example: 1,
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public findAll(@Query('userId', new ParseIntPipe()) userId: number) {
    return this.followersService.findAll(userId);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Returns a follower with a given id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Follower returned successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Follower with the given id cannot be found.',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    example: 1,
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.followersService.findById(id);
  }

  @ApiOperation({
    summary: 'Unfollows a given user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User unfollowed successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Follower with the given id could not be found.',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    example: 1,
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  @Delete('/:id')
  public delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.followersService.delete(id);
  }
}
