import { BaseSchema } from '@/utils/BaseSchema';
import { BaseOmitType } from '@/utils/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginInput extends BaseOmitType(BaseSchema) {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class Token {
  @IsString()
  @ApiProperty()
  accessToken: string;
}

export class RefreshedUserInput {
  @ApiProperty()
  userId: number;
}
