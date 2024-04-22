import axios from 'axios';

type SendOtpResponse = {
	pinId: string;
	t0: string;
	smsStatus: string;
};

type VerifyOtpResponse = {
	access_token: string;
	pinId: string;
	verified: boolean;
	msisdn: string;
};

export async function sendOtpToPhone(phone: string): Promise<SendOtpResponse> {
	const res = await axios.post<SendOtpResponse>(
		`${process.env.EXPO_API_URL}/sendOtp`,
		{
			phone,
		}
	);
	return res.data;
}

export async function verifyOtp(
	phone: string,
	pinId: string,
	otp: string
): Promise<VerifyOtpResponse> {
	const res = await axios.post<VerifyOtpResponse>(
		`${process.env.EXPO_API_URL}/verifyOtp`,
		{
			phone,
			pinId,
			otp,
		}
	);
	return res.data;
}
