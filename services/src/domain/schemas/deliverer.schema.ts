import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type DelivererDocument = HydratedDocument<Deliverer>;

@Schema({
  toJSON: {
    transform: function (_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Deliverer {
  @Prop({ unique: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  imageUrl: string;
}

export const DelivererSchema = SchemaFactory.createForClass(Deliverer);
