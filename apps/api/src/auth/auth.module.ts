import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthOTPService } from './auth.otp.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ secret: process.env.NEST_JWT_SECRET }),
  ],
  providers: [AuthService, AuthOTPService],
  controllers: [AuthController],
})
export class AuthModule {}
