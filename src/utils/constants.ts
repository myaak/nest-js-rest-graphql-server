import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const refreshTokenCookie = 'refreshToken';

export const oneWeekExpiration = 60 * 60 * 24 * 7;
export const twoWeeksExpiration = 60 * 60 * 24 * 14;
