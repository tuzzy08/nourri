import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import mongoose from 'mongoose';

type GeoLocation = {
  lat: number;
  long: number;
};

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  createVendor(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.createVendor(createVendorDto);
  }

  @Get('closest')
  getClosestVendorsToUser(@Query() coordinates: GeoLocation) {
    return this.vendorsService.getClosestVendorsToUser(coordinates);
  }

  @Get('all')
  getAllVendors() {
    return this.vendorsService.getAllVendors();
  }

  @Get(':id')
  getVendorbyVendorId(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.vendorsService.getVendorbyVendorId(id);
  }
}
