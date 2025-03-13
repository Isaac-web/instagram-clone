import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ACTIVE_USER_KEY } from '../constants/auth.constants';

export const ActiveUser = createParamDecorator(
  (
    field: keyof Omit<User, 'password' | 'googleId'> | undefined,
    context: ExecutionContext,
  ): User | undefined => {
    const request = context.switchToHttp().getRequest();

    const user = request?.[ACTIVE_USER_KEY];

    delete user.password;
    delete user.googleId;

    return field ? user?.[field] : user;
  },
);
