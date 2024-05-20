import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

export class BaseSchema {
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional()
  deletedAt: Date;
}
