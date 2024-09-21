import { LikesService } from './providers/likes.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { LikePostDto } from './dtos/like-post.dto';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @Post()
  @ApiOperation({
    summary: 'Likes or unlikes a post.',
  })
  @ApiResponse({
    status: 200,
    description: 'Post liked or unliked successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'User or post could not be found.',
  })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Authorization bearer token',
  })
  @HttpCode(HttpStatus.OK)
  public likePost(
    @Body() likePostDto: LikePostDto,
    @ActiveUser('id') userId: number,
  ) {
    return this.likesService.toggleLikePost(likePostDto, userId);
  }
}
