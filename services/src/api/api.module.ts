import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [UserModule, CategoryModule, ShopModule],
})
export class ApiModule {}
