import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTable } from '@/utils/BaseTable';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@ObjectType()
export class Message extends BaseTable {
  @ApiProperty()
  @Field(() => Int, { description: 'message id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'author_id' })
  author: User | null;

  @ApiProperty()
  @Field(() => String, { description: 'message text' })
  @Column({ name: 'text' })
  text: string;

  @ApiProperty()
  @Field(() => Int, { description: 'message reply id' })
  replyId?: number | null;
}
