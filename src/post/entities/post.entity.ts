import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTable } from '@/utils/BaseTable';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@/comment/entities/comment.entity';
import { User } from '@/user/entities/user.entity';
import { ObjectType } from '@nestjs/graphql';

export interface PostCreate
  extends Omit<
    Post,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'comments'
    | 'author'
    | 'likes'
  > {}

@Entity()
@ObjectType()
@Index('UQ_post_id', ['id'], { unique: true })
export class Post extends BaseTable {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'title' })
  title: string;

  @ApiProperty()
  @Column({ name: 'description' })
  description: string;

  @ApiProperty()
  @Column({ name: 'likes', default: 0 })
  likes: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
