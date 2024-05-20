import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QueryFailedErrorDto {
  @IsString()
  @ApiProperty()
  context: string;

  @IsString()
  @ApiProperty()
  message: string;

  @IsString()
  @ApiProperty()
  type: string;
}
