import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema, Shop, ShopSchema } from 'src/domain/schemas';
import { Category, CategorySchema } from 'src/domain/schemas/category.schema';
import { UserModule } from '../user/user.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
