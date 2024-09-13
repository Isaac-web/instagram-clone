import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    private readonly jwtservice: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken(
    sub: number,
    expiresIn: number,
    options?: Record<string, unknown>,
  ) {
    return await this.jwtservice.signAsync(
      { sub, ...options },
      {
        secret: this.jwtConfigurations.secret,
        audience: this.jwtConfigurations.audience,
        issuer: this.jwtConfigurations.issuer,
        expiresIn: expiresIn,
      },
    );
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(user.id, this.jwtConfigurations.accessTokenTtl, {
        email: user.email,
      }),
      this.signToken(user.id, this.jwtConfigurations.refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
