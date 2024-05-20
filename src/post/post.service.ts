import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@/post/entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { Comment } from '@/comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: User['id']) {
    const author = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const newPost = {
      ...createPostDto,
      author: author,
    };

    return await this.postRepository.save(newPost);
  }

  async findAll() {
    return this.postRepository.find({
      relations: ['author'],
    });
  }

  async findOne(id: number) {
    return this.postRepository.findOne({
      relations: ['author'],
      where: {
        id,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne({
      relations: ['comments'],
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.commentRepository.remove(post.comments);
    await this.postRepository.remove(post);

    return '';
  }
}
