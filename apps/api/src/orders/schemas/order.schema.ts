import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Item } from 'src/vendors/schemas/item.schema';

export type OrderDocument = HydratedDocument<Order>;

enum OrderStatus {
  UNPAID = 'UNPAID',
  CANCELED = 'CANCELED',
  AWAITING_VENDOR_CONFIRMATION = 'AWAITING_VENDOR_CONFIRMATION',
  AWAITING_RIDER_CONFIRMATION = 'AWAITING_RIDER_CONFIRMATION',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  DELIVERY_UNASSIGNED = 'DELIVERY_UNASSIGNED',
  DELIVERY_ASSIGNED = 'DELIVERY_ASSIGNED',
  DELIVERY_ENROUTE = 'DELIVERY_ENROUTE',
  DELIVERED = 'DELIVERED',
}

@Schema()
export class Order {
  @Prop({ required: true })
  orderNo: string;

  @Prop({
    required: true,
  })
  items: Item[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: Date.now() })
  timeStamp: Date;

  @Prop({ required: false })
  riderId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
