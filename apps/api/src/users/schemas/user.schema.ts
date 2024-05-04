import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/orders/schemas/order.schema';
import { Item } from 'src/vendors/schemas/item.schema';

export type UserDocument = HydratedDocument<User>;

enum LoginMethod {
  SOCIAL = 'SOCIAL',
  PHONE = 'PHONE',
}

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
  wallet_account_bank: string;

  @Prop()
  wallet_account_no: string;

  @Prop()
  birthDate: Date;

  @Prop({ required: false })
  referralCode: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false,
  })
  orders: Order[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: false,
  })
  favorites: Item[];

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ required: false })
  loginMethod: LoginMethod;
}

export const UserSchema = SchemaFactory.createForClass(User);
