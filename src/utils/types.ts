import { Type as _Type } from '@nestjs/common';
import { BaseSchema } from '@/utils/BaseSchema';
import { OmitType } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { User } from '@/user/entities/user.entity';

export const BaseOmitType = <T extends BaseSchema, K extends keyof T>(
  Dto: _Type<T>,
  fields?: readonly K[],
) => OmitType(Dto, ['createdAt', 'updatedAt', 'deletedAt', ...(fields ?? [])]);

export interface FastifyRequestWithUser extends FastifyRequest {
  user: User;
}
