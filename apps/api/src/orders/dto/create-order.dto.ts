import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}
export class CreateOrderDto {
  @ApiProperty()
  user_id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  order_id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  items: mongoose.Schema.Types.ObjectId[];

  @ApiProperty()
  order_status: OrderStatus;

  @ApiProperty()
  order_timestamp: Date;

  @ApiProperty({ required: false })
  assigned_rider: string;
}
