import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  pinId: string;

  @ApiProperty()
  pin: string;
}
