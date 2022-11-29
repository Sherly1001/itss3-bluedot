import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Shop } from './shop.schema';

export type ItemDocument = HydratedDocument<Item>;

@Schema({
  toJSON: {
    transform: function (_doc, ret, _options) {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Item {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop(
    raw({
      shop: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }] },
      price: { type: Number },
      rate: { type: Number },
    }),
  )
  prices: Array<{ shop: Shop; price: number; rate: number }>;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
