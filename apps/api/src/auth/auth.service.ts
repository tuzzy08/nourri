import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async register(data: RegisterDto) {
    // TODO: Validate token gotten after registering with kinde
    // TODO: Create a user in MongoDB & return User ID
    console.log('In auth service', data);
  }

  // async signIn(email: string, password: string): Promise<any> {
  //   const user = this.userService.findOne(email);
  // }
}
