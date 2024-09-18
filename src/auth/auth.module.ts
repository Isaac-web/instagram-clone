import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { HashProvider } from './providers/hash.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { GoogleModule } from './social/google/google.module';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule,
    ConfigModule.forFeature(jwtConfig),
    GoogleModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashProvider,
      useClass: BcryptProvider,
    },
    GenerateTokenProvider,
  ],
  exports: [HashProvider, GenerateTokenProvider],
})
export class AuthModule {}
