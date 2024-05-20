import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginInput } from '@/auth/dto/auth.dto';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { SessionService } from '@/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  async signIn(loginDto: LoginInput) {
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.passhash,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }

    const userForToken = this.userService.userForToken(user);

    const tokens = await this.getTokens(userForToken);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signUp(loginDto: LoginInput) {
    const user = await this.userService.findByUsername(loginDto.username);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const { password, ...userInfoWithoutPassword } = loginDto;

    const hash = await this.hashData(password);
    const newUser = await this.userService.create({
      ...userInfoWithoutPassword,
      username: userInfoWithoutPassword.username,
      email: userInfoWithoutPassword.email,
      passhash: hash,
    });

    const userForToken = this.userService.userForToken(newUser);

    const tokens = await this.getTokens(userForToken);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    const hashedRefreshToken = refreshToken
      ? await this.hashData(refreshToken)
      : null;
    await this.sessionService.upsert({
      userId,
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(user: ReturnType<typeof this.userService.userForToken>) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          ...user,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          userId: user.id,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '14d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async hashData(data: string) {
    console.log(data);
    return bcrypt.hash(data, 4);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId);
    const session = await this.sessionService.findOne(userId);

    if (!user || !session?.refreshToken || !refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    console.log('refresh', session.refreshToken);

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      session.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('not match');

    const userForToken = this.userService.userForToken(user);
    const tokens = await this.getTokens(userForToken);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
