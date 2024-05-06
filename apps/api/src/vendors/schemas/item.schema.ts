import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category, Vendor } from './vendor.schema';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' })
  vendorId: Vendor;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
