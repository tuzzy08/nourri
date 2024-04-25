import { BadRequestException, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { SendOTPDto } from './dto/sendOtp.dto';
import { VerifyOtpDto } from './dto/VerifyOtp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Req() req: Request) {
    const data: RegisterDto = req.body;
    return this.authService.register(data);
  }

  @Post('sendOtp')
  sendOTP(@Req() req: Request) {
    const { phone }: SendOTPDto = req.body;
    if (!phone) throw new BadRequestException('Phone number is required');
    console.log('🚀 ~ AuthController ~ sendOTP ~ phone:', phone);
    setTimeout(() => {
      console.log('🚀 ~ AuthController ~ sendOTP ~ 3s Timeout:');
      // this.authService.sendOTP(phone);
    }, 3000);

    return { pinId: '123456', smsStatus: 'Message Sent' };
    // return this.authService.sendOTP(phone);
  }

  @Post('verifyOtp')
  verifyOTP(@Req() req: Request) {
    const { phone, pinId, pin }: VerifyOtpDto = req.body;
    if (!phone || !pin || !pinId)
      throw new BadRequestException('Phone, pinId and OTP are required');

    return this.authService.verifyOTP(phone, pinId, pin);
  }
}
