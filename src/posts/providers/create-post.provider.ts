import { CreatePostDto } from './../dtos/create-post.dto';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserProvider } from 'src/users/providers/find-user.provider';

@Injectable()
export class CreatePostProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    private readonly findUserProvider: FindUserProvider,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    const author = await this.findUserProvider.findByIdOrThrow(
      createPostDto.userId,
    );

    const post = this.postsRepository.create({ ...createPostDto, author });

    try {
      return await this.postsRepository.save(post);
    } catch {
      throw new RequestTimeoutException(
        'Cannot create a new post right now. Please try again later.',
        { description: 'Could not connect to the database.' },
      );
    }
  }
}
