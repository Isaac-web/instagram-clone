import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
  autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === 'true' ? true : false,
}));
