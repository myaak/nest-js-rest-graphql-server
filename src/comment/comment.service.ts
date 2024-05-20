import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '@/comment/entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from '@/post/entities/post.entity';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    postId: number,
    userId: number,
  ) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const author = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const newComment = {
      ...createCommentDto,
      post,
      author,
    };

    return this.commentRepository.save(newComment);
  }

  async findAllForPost(postId: number) {
    const comments = await this.commentRepository.find({
      relations: ['author'],
      where: {
        post: {
          id: postId,
        },
      },
    });
    return comments;
  }

  async findAllForComment(commentId: number) {
    const comments = await this.commentRepository.findOne({
      relations: ['replies'],
      where: {
        id: commentId,
      },
    });
    return comments?.replies || [];
  }

  async createCommentReply() {}

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment doesnt exist');
    }

    return this.commentRepository.update(comment.id, {
      ...updateCommentDto,
    });
  }

  async remove(id: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment doesnt exist');
    }

    return this.commentRepository.remove(comment);
  }
}
