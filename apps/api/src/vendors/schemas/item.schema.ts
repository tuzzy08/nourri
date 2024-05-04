import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop()
  title: string;

  @Prop()
  imageUrl: string;

  @Prop({ required: false })
  description: string;

  @Prop()
  price: number;

  @Prop()
  inStock: boolean;

  @Prop()
  cooKTime: string;

  @Prop()
  category: { type: mongoose.Schema.Types.ObjectId; ref: 'Category' };

  @Prop()
  vendorId: { type: mongoose.Schema.Types.ObjectId; ref: 'Vendor' };
}

export const ItemSchema = SchemaFactory.createForClass(Item);
