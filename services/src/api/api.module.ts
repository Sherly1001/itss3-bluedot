import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { DeliverierModule } from './deliverier/deliverier.module';
import { ItemModule } from './item/item.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    ShopModule,
    ItemModule,
    DeliverierModule,
  ],
})
export class ApiModule {}
