import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MealDocument = HydratedDocument<Meal>;

@Schema()
export class Meal {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  inStock: boolean;

  @Prop()
  vendorId: mongoose.Schema.Types.ObjectId;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
