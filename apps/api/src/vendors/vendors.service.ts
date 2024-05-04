import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
// import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schemas/item.schema';
import { Category, Vendor } from './schemas/vendor.schema';
import { Model } from 'mongoose';

@Injectable()
export class VendorsService {
  constructor(
    @InjectModel(Vendor.name) private vendorModel: Model<Vendor>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Item.name) private itemModel: Model<Item>,
  ) {}
  async create(createVendorDto: CreateVendorDto) {
    const existing_vendor = await this.findbyVendorId(createVendorDto.vendorId);
    if (existing_vendor)
      throw new HttpException(
        'A vendor with this id exists',
        HttpStatus.BAD_REQUEST,
      );
    const new_vendor = new this.vendorModel(createVendorDto);
    return new_vendor.save();
  }

  async findAll() {
    try {
      const all_vendors = await this.vendorModel.find().exec();
      return all_vendors;
    } catch (error) {
      console.log(error);
    }
  }

  async findbyVendorId(vendor_id: string) {
    try {
      const vendor = await this.vendorModel
        .findOne({ vendorId: vendor_id })
        .exec();
      return vendor;
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
