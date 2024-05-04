import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty()
  vendorId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  logo_url: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  contact_phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  payout_bank_name: string;

  @ApiProperty()
  payout_account_number: string;
}
