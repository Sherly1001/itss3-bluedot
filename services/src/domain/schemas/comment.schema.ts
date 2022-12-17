import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  @ApiProperty()
  content: string;

  @Prop({ default: 5, min: 0.5, max: 5 })
  @ApiProperty()
  rate: Number;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Item', required: true }])
  @ApiProperty()
  item: Types.ObjectId[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'User', required: true }])
  @ApiProperty()
  user: Types.ObjectId[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Shop', required: true }])
  @ApiProperty()
  shop: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
