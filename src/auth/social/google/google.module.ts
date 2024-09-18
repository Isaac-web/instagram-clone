import { forwardRef, Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './providers/google.service';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from 'src/config/google-oauth.config';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(googleOauthConfig),
    forwardRef(() => UsersModule),
  ],
  controllers: [GoogleController],
  providers: [GoogleService],
})
export class GoogleModule {}
