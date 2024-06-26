import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  UseGuards,
  // Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get(':phone')
  findByPhone(@Param('phone') phone: string) {
    return this.usersService.findByPhone(phone);
  }

  // @Patch(':email')
  // update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(email, updateUserDto);
  // }

  // @Delete(':email')
  // remove(@Param('email') email: string) {
  //   return this.usersService.remove(email);
  // }
}
