import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VendorDocument = HydratedDocument<Vendor>;

@Schema()
export class Vendor {
  @Prop({ required: false })
  payout_bank_name: string;

  @Prop({ required: false, unique: true })
  payout_account_number: string;

  @Prop({ unique: true })
  name: string;

  @Prop({ unique: true })
  logo_url: string;

  @Prop({ required: false, unique: true })
  email: string;

  @Prop({ unique: true })
  contact_phone: string;

  @Prop({ unique: true })
  address: string;

  @Prop({ unique: true })
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

  @Prop({ required: false })
  items: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Item' }];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export const VendorSchema = SchemaFactory.createForClass(Vendor);
