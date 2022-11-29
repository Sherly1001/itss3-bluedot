import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    uri: process.env.DATABASE_URI,
    name: process.env.DATABASE_NAME,
  },
  jwt: {
    key: process.env.JWT_SECRET_KEY || 'key',
  },
}));

export type AppConfig = ConfigType<typeof appConfig>;
export const InjectAppConfig = () => Inject(appConfig.KEY);
