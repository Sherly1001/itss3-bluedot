import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema, Shop, ShopSchema } from 'src/domain/schemas';
import { UserModule } from '../user/user.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Shop.name, schema: ShopSchema },
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
  providers: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
