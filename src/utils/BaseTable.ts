import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';

export class BaseTable {
  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @Field(() => Date)
  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date;
}
