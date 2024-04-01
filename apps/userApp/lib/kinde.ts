import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';

const client = new KindeSDK(
	process.env.KINDE_ISSUER_URL!,
	process.env.KINDE_POST_CALLBACK_URL!,
	process.env.KINDE_CLIENT_ID!,
	process.env.KINDE_POST_LOGOUT_REDIRECT_URL!
);

export default client;
