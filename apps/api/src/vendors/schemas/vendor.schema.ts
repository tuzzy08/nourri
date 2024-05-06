import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Item } from './item.schema';

export type VendorDocument = HydratedDocument<Vendor>;

@Schema()
export class Vendor {
  @Prop({ required: false })
  payout_bank_name: string;

  @Prop({ required: false, unique: true })
  payout_account_number: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  logo_url: string;

  @Prop({ required: false, unique: true })
  email: string;

  @Prop({ unique: true })
  contact_phone: string;

  @Prop({ unique: true })
  address: string;

  @Prop({
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    required: true,
    unique: true,
  })
  _geoloc: {
    lat: number;
    lng: number;
  };

  @Prop()
  categories: [Category];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] })
  items: Item[];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isActive: boolean;
}

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' })
  vendorId: Vendor;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] })
  items: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Item' }];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export const VendorSchema = SchemaFactory.createForClass(Vendor);
