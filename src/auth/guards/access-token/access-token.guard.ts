import { FindUserProvider } from 'src/users/providers/find-user.provider';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { ACTIVE_USER_KEY } from 'src/auth/constants/auth.constants';
import { AccessTokenPayload } from 'src/auth/interfaces/access-token-payload.interfaces';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,

    private readonly findUserProvider: FindUserProvider,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromRequest(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload: AccessTokenPayload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfigurations,
      );

      const user = await this.findUserProvider.findByIdOrThrow(payload.sub);

      request[ACTIVE_USER_KEY] = user;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  public extractTokenFromRequest(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') || [];

    return token;
  }
}
