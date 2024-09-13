import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { FindUserProvider } from 'src/users/providers/find-user.provider';
import { HashProvider } from './hash.provider';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserprovider: FindUserProvider,

    private readonly hashProvider: HashProvider,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    const user = await this.findUserprovider.findByEmail(signInDto.email);
    if (!user) throw new BadRequestException('Invalid email or password.');

    const isValidPassword = await this.hashProvider.compare(
      signInDto.password,
      user.password,
    );

    if (!isValidPassword)
      throw new BadRequestException('Invalid email or password.');

    return await this.generateTokenProvider.generateTokens(user);
  }
}
