import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
  toJSON: {
    transform: function (_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Chat {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  from: string;

  @Prop({ type: Types.ObjectId, ref: 'Shop' })
  fromShop: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @ApiProperty()
  to: string;

  @Prop({ type: Types.ObjectId, ref: 'Shop' })
  @ApiProperty()
  toShop: string;

  @Prop()
  @ApiProperty()
  content: string;

  @Prop({ default: () => Date.now() })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
