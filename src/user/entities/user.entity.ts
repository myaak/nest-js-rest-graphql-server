import { BaseTable } from '@/utils/BaseTable';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Comment } from '@/comment/entities/comment.entity';
import { Post } from '@/post/entities/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from '@/chat/entities/chat.entity';

export interface UserCreate
  extends Omit<
    User,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'refreshToken'
    | 'comments'
    | 'posts'
    | 'messages'
  > {}

@Entity()
@ObjectType()
@Index('UQ_user_username', ['username'], { unique: true })
export class User extends BaseTable {
  @ApiProperty()
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field()
  @Column({ name: 'username' })
  username: string;

  @ApiProperty()
  @Field()
  @Column({ name: 'email', nullable: true })
  email: string;

  @ApiHideProperty()
  @Column({ name: 'passhash' })
  passhash: string;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];
}
