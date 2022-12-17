import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type DeliverierDocument = HydratedDocument<Deliverier>;

@Schema({
  toJSON: {
    transform: function (_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Deliverier {
  @Prop({ unique: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  imageUrl: string;
}

export const DeliverierSchema = SchemaFactory.createForClass(Deliverier);
