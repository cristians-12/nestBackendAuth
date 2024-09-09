import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop({ type: [Number], default: [] })
  favorites: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);
