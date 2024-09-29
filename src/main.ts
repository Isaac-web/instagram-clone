import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { config as awsConfig } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = app.get(ConfigService);

  awsConfig.update({
    region: config.get('aws.region'),
    credentials: {
      accessKeyId: config.get('aws.accessKeyId'),
      secretAccessKey: config.get('aws.secretAccessKey'),
    },
  });

  const swaggerConfig = new DocumentBuilder().setVersion('1.0.9').build();
  const docs = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, docs);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
