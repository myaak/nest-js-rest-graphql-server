import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post as PostReq,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryFailedErrorDto } from '@/filters/dto/query-fail.dto';
import { FastifyRequestWithUser } from '@/utils/types';
import { Post } from '@/post/entities/post.entity';
import { Public } from '@/utils/constants';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('post')
@UseInterceptors(CacheInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ description: 'create post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'created post',
    type: Post,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: QueryFailedErrorDto,
  })
  @PostReq()
  create(
    @Req() req: FastifyRequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.create(createPostDto, +req.user.id);
  }

  @ApiOperation({ description: 'Get posts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Got posts',
    type: Post,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: QueryFailedErrorDto,
  })
  @Get()
  @Public()
  findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({ description: 'Get users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Got users',
    type: Post,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: QueryFailedErrorDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
