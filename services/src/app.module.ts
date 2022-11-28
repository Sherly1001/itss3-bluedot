import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig, appConfig } from './config';
import {
  Item,
  ItemSchema,
  Shop,
  ShopSchema,
  User,
  UserSchema,
} from './domain/schemas';

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
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
})
export class AppModule {}
