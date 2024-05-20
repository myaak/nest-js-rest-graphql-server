import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FastifyRequestWithUser } from '@/utils/types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryFailedErrorDto } from '@/filters/dto/query-fail.dto';
import { Comment } from '@/comment/entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Req() req: FastifyRequestWithUser,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(
      createCommentDto,
      createCommentDto.postId,
      req.user.id,
    );
  }

  @ApiOperation({ description: 'Get users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Got users',
    type: Comment,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: QueryFailedErrorDto,
  })
  @Get('post/:id')
  findAll(@Param('id') id: string) {
    return this.commentService.findAllForPost(+id);
  }

  @Get('comment/:id')
  findAllForComment(@Param('id') id: string) {
    return this.commentService.findAllForPost(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
