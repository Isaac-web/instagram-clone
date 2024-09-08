import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environmentsValidationSchema } from './config/environments.validation.config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
