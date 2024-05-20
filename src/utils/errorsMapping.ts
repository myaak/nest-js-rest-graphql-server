import { HttpStatus } from '@nestjs/common';

export const errorMapping = {
  '23505': {
    type: 'alreadyExist',
    message: 'Поле должно быть уникальным',
    status: HttpStatus.CONFLICT,
  },
};
