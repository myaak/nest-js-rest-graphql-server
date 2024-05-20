import { BaseTable } from '@/utils/BaseTable';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@/user/entities/user.entity';
import { Post } from '@/post/entities/post.entity';
import { ObjectType } from '@nestjs/graphql';

export interface CommentCreate
  extends Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

@Entity()
@ObjectType()
@Index('UQ_comment_id', ['id'], { unique: true })
export class Comment extends BaseTable {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'description' })
  description: string;

  @ApiProperty()
  @Column({ name: 'likes', default: 0 })
  likes: number;

  @ApiProperty()
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.replies)
  replies: Comment[];
}
