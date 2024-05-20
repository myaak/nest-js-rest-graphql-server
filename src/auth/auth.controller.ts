import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { QueryFailedErrorDto } from '@/filters/dto/query-fail.dto';
import { LoginInput, Token } from '@/auth/dto/auth.dto';
import { Public, refreshTokenCookie } from '@/utils/constants';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { getWeeklyTime } from '@/utils/adapters';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  @ApiOperation({ description: 'Login user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logged user',
    type: Token,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: QueryFailedErrorDto,
  })
  async login(
    @Req() request: FastifyRequest,
    @Body() loginDto: LoginInput,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const tokens = await this.authService.signIn(loginDto);

    response.setCookie(refreshTokenCookie, tokens.refreshToken, {
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
      maxAge: getWeeklyTime(2),
    });

    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Post('register')
  @ApiOperation({ description: 'Register user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registered user',
    type: Token,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: QueryFailedErrorDto,
  })
  async register(
    @Req() request,
    @Body() loginDto: LoginInput,
    @Res({ passthrough: true }) response,
  ) {
    const tokens = await this.authService.signUp(loginDto);

    response.setCookie(refreshTokenCookie, tokens.refreshToken, {
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
      maxAge: getWeeklyTime(2),
    });

    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Get('refresh')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Refreshed token',
    type: Token,
  })
  async refreshTokens(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) response,
  ) {
    const refreshToken = req.cookies['refreshToken'] as string;

    if (!refreshToken) {
      throw new ForbiddenException('Token is not provided');
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_SECRET,
    });

    const tokens = await this.authService.refreshTokens(
      payload.userId,
      refreshToken,
    );

    response.setCookie(refreshTokenCookie, tokens.refreshToken, {
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
      maxAge: getWeeklyTime(2),
    });

    return { accessToken: tokens.accessToken };
  }
}
