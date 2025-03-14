import { GetPostQueryDto } from './dtos/get-post-query.dto';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { PostsService } from './providers/posts.service';
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
  Query,
} from '@nestjs/common';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-types.enum';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post()
  @ApiOperation({
    summary: 'Creates a new post.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post was created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid post data.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Returns a list of posts.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts returned successfully.',
  })
  @Auth(AuthType.Bearer)
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public findAll(@Query() getPostQueryDto: GetPostQueryDto) {
    return this.postsService.findAll(getPostQueryDto);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Returns a post with a given id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post returned successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post could not be found.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.findById(id);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Updates a post with a given id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid post data.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post could not be found.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() patchPostDto: PatchPostDto,
  ) {
    return this.postsService.update(id, patchPostDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Deletes a post with a given id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post could not be found.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  public delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.delete(id);
  }
}
