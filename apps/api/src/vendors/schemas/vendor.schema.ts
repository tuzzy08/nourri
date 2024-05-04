import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VendorDocument = HydratedDocument<Vendor>;

@Schema()
export class Vendor {
  @Prop({ required: false })
  vendorId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false })
  payout_bank_name: string;

  @Prop({ required: false })
  payout_account_number: string;

  @Prop()
  name: string;

  @Prop()
  logo_url: string;

  @Prop({ required: false })
  email: string;

  @Prop()
  contact_phone: string;

  @Prop()
  address: string;

  @Prop()
  geo_location: {
    latitude: number;
    longitude: number;
  };

  @Prop()
  categories: [Category];

  @Prop()
  items: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Item' }];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isActive: boolean;
}

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  vendorId: { type: mongoose.Schema.Types.ObjectId; ref: 'Vendor' };

  @Prop()
  items: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Item' }];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export const VendorSchema = SchemaFactory.createForClass(Vendor);
