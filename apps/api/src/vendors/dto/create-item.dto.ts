import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class CreateItemDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  inStock: boolean;

  @ApiProperty()
  cooKTime: string;

  @ApiProperty()
  category: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  vendorId: mongoose.Schema.Types.ObjectId;
}
