import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { Shop } from './shop.schema';

export type ItemDocument = HydratedDocument<Item>;

@Schema({
  toJSON: {
    transform: function (_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      for (const p in ret.prices) {
        delete ret.prices[p]?._id;
      }
    },
  },
})
export class Item {
  @Prop({ unique: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  @ApiProperty()
  categories: Array<Types.ObjectId>;

  @Prop({
    type: [
      {
        shop: { type: Types.ObjectId, ref: 'Shop' },
        price: { type: 'number' },
        rate: { type: 'number' },
      },
    ],
  })
  @ApiProperty({
    type: 'array',
    items: {
      properties: {
        shop: { type: 'string' },
        price: { type: 'number' },
        rate: { type: 'number' },
      },
    },
  })
  prices: Array<{ shop: Shop; price: number; rate: number }>;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
