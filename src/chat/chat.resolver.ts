import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Message } from './entities/chat.entity';

import { PubSub } from 'graphql-subscriptions';
import { UserService } from '@/user/user.service';
import { Public } from '@/utils/constants';
import { ChatService } from '@/chat/chat.service';
import { CreateMessageDto } from '@/chat/dto/create-chat.input';

const messsageSub = new PubSub();

@Resolver((of) => Message)
export class ChatResolver {
  constructor(
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  @Public()
  @Query((returns) => [Message])
  async messages() {
    return this.chatService.findAll();
  }

  @Public()
  @Mutation((returns) => Message)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageDto,
  ) {
    const newMessage = await this.chatService.create(createMessageInput);
    await messsageSub.publish('messageAdded', { messageAdded: newMessage });
    return newMessage;
  }

  @Public()
  @Subscription((returns) => Message, { name: 'messageAdded' })
  async messageAdded() {
    return messsageSub.asyncIterator('messageAdded');
  }
}
