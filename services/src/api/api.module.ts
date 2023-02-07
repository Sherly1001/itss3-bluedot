import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { DelivererModule } from './deliverer/deliverer.module';
import { ItemModule } from './item/item.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    ShopModule,
    ItemModule,
    CommentModule,
    DelivererModule,
    ChatModule,
  ],
})
export class ApiModule {}
