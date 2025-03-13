import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  version: '1.0.0',
}));
