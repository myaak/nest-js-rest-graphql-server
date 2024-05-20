import { IsInt, IsString } from 'class-validator';

export class SessionDto {
  @IsInt()
  userId: number;

  @IsString()
  refreshToken: string | null;
}
