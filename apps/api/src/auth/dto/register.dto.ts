import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty({ required: false })
  referralCode: string;
}
