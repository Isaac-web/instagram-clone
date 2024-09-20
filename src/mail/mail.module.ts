import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('mail.host'),
          secure: config.get('mail.secure'),
          port: config.get('mail.port'),
          auth: {
            user: config.get('mail.mailAuthUser'),
            pass: config.get('mail.mailAuthPassword'),
          },
        },
        defaults: {
          from: config.get('mail.defaultSender'),
        },
        template: {
          adapter: new EjsAdapter({ inlineCssEnabled: true }),
          dir: `${__dirname}/templates`,
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
