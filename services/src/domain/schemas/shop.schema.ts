import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({
  toJSON: {
    transform: function (_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Shop {
  @Prop({ unique: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  imageUrl: string;

  @Prop()
  @ApiProperty()
  description: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
