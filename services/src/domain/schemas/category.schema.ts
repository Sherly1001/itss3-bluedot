import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  toJSON: {
    transform: function (_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Category {
  @Prop({ unique: true })
  @ApiProperty()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
