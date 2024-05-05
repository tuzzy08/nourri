import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
// import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schemas/item.schema';
import { Category, Vendor } from './schemas/vendor.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class VendorsService {
  constructor(
    @InjectModel(Vendor.name) private vendorModel: Model<Vendor>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Item.name) private itemModel: Model<Item>,
  ) {}
  async createVendor(createVendorDto: CreateVendorDto) {
    const existing_vendor = await this.findByPhoneNumber(
      createVendorDto.contact_phone,
    );
    if (existing_vendor)
      throw new HttpException(
        'A vendor with this id exists',
        HttpStatus.BAD_REQUEST,
      );
    const new_vendor = new this.vendorModel(createVendorDto);
    return new_vendor.save();
  }

  async findAllVendors() {
    const all_vendors = await this.vendorModel
      .find()
      .exec()
      .catch((err) => console.log(err));
    return all_vendors;
  }

  async findVendorbyVendorId(vendor_id: mongoose.Schema.Types.ObjectId) {
    const vendor = await this.vendorModel
      .findOne({ vendorId: vendor_id })
      .exec()
      .catch((err) => console.log(err));
    return vendor;
  }

  async findByPhoneNumber(phone: string) {
    const user = await this.vendorModel
      .findOne({ contact_phone: phone })
      .exec()
      .catch((err) => {
        console.log(err);
      });
    return user;
  }

  async createVendorCategory(
    vendor_id: mongoose.Schema.Types.ObjectId,
    categories: string[],
  ) {
    try {
      const vendor = await this.findVendorbyVendorId(vendor_id);
      if (vendor) {
        categories.map((category, i) => {
          // Create new category
          const new_category = new this.categoryModel({
            name: category[i],
            vendorId: vendor._id,
          });
          // Add to vendor's list of categories
          vendor.categories.push(new_category);
        });
        return await vendor.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // update(id: number, updateVendorDto: UpdateVendorDto) {
  //   return `This action updates a #${id} vendor`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} vendor`;
  // }
}
