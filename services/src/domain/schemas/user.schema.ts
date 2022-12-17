import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    transform: function (_doc, ret, _options) {
      delete ret.hashPassword;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class User {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop({ unique: true })
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  avatarUrl: string;

  @Prop()
  hashPassword: string;

  @Prop({ default: false })
  @ApiProperty()
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
