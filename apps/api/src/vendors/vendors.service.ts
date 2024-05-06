import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
// import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schemas/item.schema';
import { Category, Vendor } from './schemas/vendor.schema';
import mongoose, { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
// import cloudinary from '../../lib/cloudinary';

type GeoLocation = {
  lat: number;
  long: number;
};
@Injectable()
export class VendorsService {
  constructor(
    @InjectModel(Vendor.name) private vendorModel: Model<Vendor>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Item.name) private itemModel: Model<Item>,
  ) {}
  async createVendor(createVendorDto: CreateVendorDto) {
    const existing_vendor = await this.getVendorByPhoneNumber(
      createVendorDto.contact_phone,
    );
    if (existing_vendor)
      throw new HttpException(
        'A vendor with this id exists',
        HttpStatus.BAD_REQUEST,
      );
    const new_vendor = new this.vendorModel(createVendorDto);
    const result = await new_vendor.save().catch((err) => console.log(err));
    return result;
  }

  async getClosestVendorsToUser(coords: GeoLocation) {
    // Implement Algolia Geosearch or Typesense here
    return coords;
  }

  async getAllVendors() {
    const all_vendors = await this.vendorModel
      .find()
      .exec()
      .catch((err) => console.log(err));
    return all_vendors;
  }

  async getVendorbyVendorId(vendor_id: mongoose.Schema.Types.ObjectId) {
    const vendor = await this.vendorModel
      .findOne({ vendorId: vendor_id })
      .exec()
      .catch((err) => console.log(err));
    return vendor;
  }

  async getVendorbyName(name: string) {
    const vendor = await this.vendorModel
      .findOne({ name })
      .exec()
      .catch((err) => console.log(err));
    return vendor;
  }

  async getVendorByPhoneNumber(phone: string) {
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
      const vendor = await this.getVendorbyVendorId(vendor_id);
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

  async createItem(item_data: CreateItemDto) {
    const new_item = new this.itemModel(item_data);
    const result = await new_item.save().catch((err) => console.log(err));
    return result;
  }

  async getItem(itemId: mongoose.Schema.Types.ObjectId) {
    const item = await this.itemModel
      .findById(itemId)
      .exec()
      .catch((err) => console.log(err));
    return item;
  }

  async getItemsByCategory(category_id: mongoose.Schema.Types.ObjectId) {
    const all_items = await this.itemModel
      .find({ category: category_id })
      .exec()
      .catch((err) => console.log(err));
    return all_items;
  }

  async getItemsByVendor(vendor_id: mongoose.Schema.Types.ObjectId) {
    const all_items = await this.itemModel
      .find({ vendorId: vendor_id })
      .exec()
      .catch((err) => console.log(err));
    return all_items;
  }

  async getAllItems() {
    const all_items = await this.itemModel
      .find({})
      .exec()
      .catch((err) => console.log(err));
    return all_items;
  }

  // update(id: number, updateVendorDto: UpdateVendorDto) {
  //   return `This action updates a #${id} vendor`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} vendor`;
  // }
}
