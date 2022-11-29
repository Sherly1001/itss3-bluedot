import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { AppConfig, appConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    MongooseModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: (cfg: AppConfig) => {
        return {
          uri: cfg.database.uri,
          dbName: cfg.database.name,
        };
      },
    }),
    ApiModule,
  ],
})
export class AppModule {}
