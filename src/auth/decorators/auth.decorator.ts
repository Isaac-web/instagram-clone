import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-types.enum';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
