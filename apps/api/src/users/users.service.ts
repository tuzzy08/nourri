import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { phone } = createUserDto;
    const existingUser = this.findByPhone(phone);
    if (existingUser)
      throw new HttpException(
        'A user with this phone exists',
        HttpStatus.BAD_REQUEST,
      );
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  // Fetch user by email
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
  // Fetch user by id
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  // Fetch user by phone
  async findByPhone(phone: string): Promise<User> {
    return this.userModel.findOne({ phone });
  }
}
