import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { Comment } from '@/comment/entities/comment.entity';
import { Post } from '@/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, Post])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
