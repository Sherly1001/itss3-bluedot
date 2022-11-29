import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({
  toJSON: {
    transform: function (_doc, ret, _options) {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Shop {
  @Prop()
  name: string;

  @Prop()
  videoLink: string;

  @Prop()
  description: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
