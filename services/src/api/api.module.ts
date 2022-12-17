import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { DelivererModule } from './deliverer/deliverer.module';
import { ItemModule } from './item/item.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    ShopModule,
    ItemModule,
    DelivererModule,
  ],
})
export class ApiModule {}
