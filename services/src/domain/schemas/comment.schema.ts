import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  @ApiProperty()
  content: string;

  @Prop({ default: 5, min: 0.5, max: 5 })
  @ApiProperty({ default: 5 })
  rate: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Item', required: false })
  @ApiProperty({ required: false, default: null })
  item: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Shop',
    required: false,
    default: null,
  })
  @ApiProperty({ required: false, default: null })
  shop: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Deliverer',
    required: false,
    default: null,
  })
  @ApiProperty({ required: false, default: null })
  deliverer: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
