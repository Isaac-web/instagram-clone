import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environmentsValidationSchema } from './config/environments.validation.config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { FollowersModule } from './followers/followers.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import jwtConfig from './auth/config/jwt.config';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { UploadsModule } from './uploads/uploads.module';
import { MailModule } from './mail/mail.module';
import { LikesModule } from './likes/likes.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { ArchivesModule } from './archives/archives.module';
import googleOauthConfig from './config/google-oauth.config';
import awsConfig from './uploads/config/aws.config';
import mailConfig from './mail/config/mail.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [
        appConfig,
        databaseConfig,
        jwtConfig,
        googleOauthConfig,
        awsConfig,
        mailConfig,
      ],
      validationSchema: environmentsValidationSchema,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config) => ({
        type: 'postgres',
        username: config.get('database.username'),
        password: config.get('database.password'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        database: config.get('database.database'),
        synchronize: config.get('database.synchronize'),
        autoLoadEntities: config.get('database.autoLoadEntities'),
      }),
    }),
    ProfilesModule,
    PostsModule,
    CommentsModule,
    FollowersModule,
    AuthModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule,
    UploadsModule,
    MailModule,
    LikesModule,
    NotificationsModule,
    PaginationModule,
    ArchivesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AccessTokenGuard,
  ],
})
export class AppModule {}
