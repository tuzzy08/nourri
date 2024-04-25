import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { AuthOTPService } from './auth.otp.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private otpService: AuthOTPService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  smsStatusMsg = 'Message Sent';

  async register(data: RegisterDto) {
    // TODO: Validate token gotten after registering with kinde
    // TODO: Create a user in MongoDB & return User ID
    console.log('In auth service', data);
    const user = await this.userService.create(data);
    const { pinId, smsStatus } = await this.sendOTP(data.phone);
    if (pinId && smsStatus === this.smsStatusMsg) return { pinId, user };
  }

  async sendOTP(phone: string) {
    try {
      const user = await this.userService.findByPhone(phone);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const { pinId, smsStatus } = await this.otpService.sendOTP(phone);
      const key = phone;
      const existingOtp = await this.cacheManager.get(key);
      if (!existingOtp) {
        await this.cacheManager.set(key, `${phone}_${pinId}_otp`);
        return { pinId, smsStatus };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async verifyOTP(phone: string, pinId: string, pin: string) {
    try {
      const user = await this.userService.findByPhone(phone);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const response = await this.otpService.verifyOTP(pinId, pin);
      if (response.verified) {
        const payload = { sub: pinId, phone: phone };
        const access_token = await this.jwtService.sign(payload);
        return { access_token, ...response };
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async signIn(email: string, password: string): Promise<any> {
  //   const user = this.userService.findOne(email);
  // }
}
