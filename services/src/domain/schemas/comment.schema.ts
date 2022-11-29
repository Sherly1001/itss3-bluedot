import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  content: string;

  @Prop()
  rate: Number;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Item' }])
  item!: Types.ObjectId[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'User' }])
  user!: Types.ObjectId[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Shop' }])
  shop!: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
