import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './providers/comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { PatchCommentDto } from './dtos/patch-comment.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new comment about a given post.',
  })
  @ApiResponse({
    status: 200,
    description: 'Comment created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid comment data.',
  })
  @ApiResponse({
    status: 404,
    description: 'User or Post could not be found.',
  })
  public create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Returns a list of comments about a particular post.',
  })
  @ApiResponse({
    status: 200,
    description: 'Comments returned successfully.',
  })
  @ApiQuery({
    name: 'postId',
    type: 'number',
    description: 'The id of the post the comment belongs to.',
    example: 1,
  })
  public findAll(@Query('postId', new ParseIntPipe()) postId: number) {
    return this.commentsService.findAll(postId);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Returns a single comment with a given id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Comment returned successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment with the given id could not be found.',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'The id of the comment.',
    example: 1,
  })
  public findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentsService.findById(id);
  }

  @Patch('/:id')
  @ApiOperation({
    description: 'Updates a comment with a given id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Comment updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid comment data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment with the given id could not be found.',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'The id of the comment.',
    example: 1,
  })
  public update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() patchCommentDto: PatchCommentDto,
  ) {
    return this.commentsService.update(id, patchCommentDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Deletes a comment with a given id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Deleted returned successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment with the given id could not be found.',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'The id of the comment.',
    example: 1,
  })
  public delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentsService.delete(id);
  }
}
