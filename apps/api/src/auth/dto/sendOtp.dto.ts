import { ApiProperty } from '@nestjs/swagger';

export class SendOTPDto {
  @ApiProperty()
  phone: string;
}
