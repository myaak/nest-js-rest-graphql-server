import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { UserService } from '@/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { Message } from '@/chat/entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [ChatResolver, ChatService, UserService],
})
export class ChatModule {}
