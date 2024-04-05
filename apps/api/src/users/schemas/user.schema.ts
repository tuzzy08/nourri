import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/orders/schemas/order.schema';
import { Meal } from 'src/vendors/schemas/meal.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  birthDate: Date;

  @Prop()
  referralCode: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  })
  orders: Order[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
  })
  favorites: Meal[];

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
