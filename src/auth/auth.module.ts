import { Module } from '@nestjs/common';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { config as dotenvConfig } from 'dotenv';
import { UserService } from '@/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { JwtStrategy } from '@/auth/strategies/jwt-strategy';
import { AccessTokenStrategy } from '@/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '@/auth/strategies/refresh-token.strategy';
import { SessionService } from '@/session/session.service';
import { Session } from '@/session/entities/session.entity';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    SessionService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
