import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Comment,
  CommentSchema,
  Deliverer,
  DelivererSchema,
  Item,
  ItemSchema,
  Shop,
  ShopSchema,
  User,
  UserSchema,
  Category,
  CategorySchema,
} from 'src/domain/schemas';
import { UserModule } from '../user/user.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
      { name: Item.name, schema: ItemSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Shop.name, schema: ShopSchema },
      { name: Deliverer.name, schema: DelivererSchema },
    ]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
