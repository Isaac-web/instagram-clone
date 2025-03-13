import { CreateUserProvider } from './../../../../users/providers/create-user.provider';
import { GenerateTokenProvider } from './../../../providers/generate-token.provider';
import { FindUserProvider } from 'src/users/providers/find-user.provider';
import { GoogleSignInDto } from './../dtos/google-sign-in.dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import googleOauthConfig from 'src/config/google-oauth.config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GoogleService {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private readonly oauthConfig: ConfigType<typeof googleOauthConfig>,

    private readonly findUserProvider: FindUserProvider,

    private readonly createUserProvider: CreateUserProvider,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  public async authenticate(googleSignInDto: GoogleSignInDto) {
    try {
      const oauthClient = new OAuth2Client({
        clientId: this.oauthConfig.clientId,
        clientSecret: this.oauthConfig.clientSecret,
      });
      const loginTicket = await oauthClient.verifyIdToken({
        idToken: googleSignInDto.token,
      });

      const { payload: googleUser } = loginTicket.getAttributes();

      const name = googleUser.name;
      const email = googleUser.email;
      const username = googleUser.email;
      const googleId = googleUser.sub;

      let user: User;

      user = await this.findUserProvider.findByGoogleId(googleId);
      if (!user) {
        user = await this.createUserProvider.createGoogleUser({
          name,
          email,
          username,
          googleId,
        });
      }

      const { accessToken, refreshToken } =
        await this.generateTokenProvider.generateTokens(user);

      return { accessToken, refreshToken };
    } catch {
      throw new UnauthorizedException('Invalid google token id.');
    }
  }
}
