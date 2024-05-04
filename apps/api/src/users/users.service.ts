import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { phone } = createUserDto;
      const existing_user = this.findByPhone(phone);
      if (existing_user)
        throw new HttpException(
          'A user with this phone exists',
          HttpStatus.BAD_REQUEST,
        );
      const new_user = new this.userModel(createUserDto);
      return new_user.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const all_users = await this.userModel.find().exec();
      return all_users;
    } catch (error) {
      console.log(error);
    }
  }
  // Fetch user by email
  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  // Fetch user by id
  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  // Fetch user by phone
  async findByPhone(phone: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ phone }).exec();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
