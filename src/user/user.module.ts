import { Module } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { UserController } from '@/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@/auth/auth.service';
import { AuthGuard } from '@/auth/guards/local-auth.guard';
import { SessionService } from '@/session/session.service';
import { Session } from '@/session/entities/session.entity';
import { Post } from '@/post/entities/post.entity';
import { Comment } from '@/comment/entities/comment.entity';
import { Message } from '@/chat/entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session, Post, Comment, Message])],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    JwtService,
    SessionService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
