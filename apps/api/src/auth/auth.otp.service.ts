import axios from 'axios';
import { Injectable } from '@nestjs/common';

export type SendOtpResponse = {
  pinId: string;
  t0: string;
  smsStatus: string;
};

export type VerifyOtpResponse = {
  pinId: string;
  verified: boolean;
  msisdn: string;
};

@Injectable()
export class AuthOTPService {
  async sendOTP(phone: string): Promise<SendOtpResponse> {
    const sender = 'Nourri';
    const msgText = 'Your Nourri login pin is < 1234 >';
    const options = {
      method: 'POST',
      url: `${process.env.TERMII_API_URL}/send`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        api_key: `${process.env.TERMII_API_KEY}`,
        message_type: 'NUMERIC',
        to: phone,
        from: sender,
        channel: 'generic',
        pin_attempts: 3,
        pin_time_to_live: 3,
        pin_length: 4,
        pin_placeholder: '< 1234 >',
        message_text: msgText,
        pin_type: 'NUMERIC',
      }),
    };
    try {
      const response = await axios.request(options);
      console.log('🚀 ~ AuthService ~ sendOTP ~ response:', response.data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ AuthService ~ sendOTP ~ error:', error);
    }
  }

  async verifyOTP(pinId: string, pin: string): Promise<VerifyOtpResponse> {
    const options = {
      method: 'POST',
      url: `${process.env.TERMII_API_URL}/verify`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        api_key: `${process.env.TERMII_API_KEY}`,
        pin_id: pinId,
        pin: pin,
      }),
    };
    try {
      const response = await axios.request(options);
      return response.data;
      console.log('🚀 ~ AuthService ~ sendOTP ~ response:', response.data);
    } catch (error) {
      console.log('🚀 ~ AuthService ~ sendOTP ~ error:', error);
    }
  }
}
