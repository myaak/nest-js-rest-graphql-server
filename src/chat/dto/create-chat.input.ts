import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMessageDto {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  authorId: number;

  @Field(() => String)
  text: string;
}
