import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Meal } from 'src/vendors/schemas/meal.schema';

export type OrderDocument = HydratedDocument<Order>;

enum OrderStatus {
  UNPAID = 'UNPAID',
  PAYMENT_CONFORMED = 'PAYMENT_CONFORMED',
  DELIVERY_UNASSIGNED = 'DELIVERY_UNASSIGNED',
  DELIVERY_ENROUTE = 'DELIVERY_ENROUTE',
  DELIVERED = 'DELIVERED',
}

@Schema()
export class Order {
  @Prop({ required: true })
  orderNo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealItem',
    required: true,
  })
  items: Meal[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: Date.now() })
  timeStamp: Date;

  @Prop()
  riderId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
