import { Item, ItemSchema } from './schemas/item.schema';
import {
  Vendor,
  VendorSchema,
  Category,
  CategorySchema,
} from './schemas/vendor.schema';
import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: Vendor.name, schema: VendorSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [VendorsController],
  providers: [VendorsService],
})
export class VendorsModule {}
