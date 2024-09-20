import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAILER_HOST,
  port: parseInt(process.env.MAILER_PORT, 10),
  secure: false,
  mailAuthUser: process.env.MAILER_AUTH_USER,
  mailAuthPassword: process.env.MAILER_AUTH_PASSWORD,
  defaultSender: process.env.MAILER_DEFAULT_SENDER,
}));
