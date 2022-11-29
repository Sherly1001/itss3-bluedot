import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransportDocument = HydratedDocument<Transport>;

@Schema()
export class Transport {
  @Prop()
  name: string;

  @Prop()
  price: Number;

  @Prop()
  rate: Number;
}

export const TransportSchema = SchemaFactory.createForClass(Transport);
