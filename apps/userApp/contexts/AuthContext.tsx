import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import auth from '@/lib/firebase';
import { set } from 'react-hook-form';
import { useBoundStore } from '@/store/store';
import {
	getFromSecureStore,
	saveToSecureStore,
} from '@/lib/secureStoreManager';
import { sendOtpToPhone, verifyOtp } from '@/lib/otpHelpers';

interface RegistrationData {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	referralCode?: string;
}

type RegistrationResponse = {
	pinId: string;
	user: any;
};

interface AuthData {
	authState?: { token: string | null; authenticated: boolean };
	loading: boolean;
	handleSignIn?: (email: string, password: string) => void;
	handleSendOtp: (phone: string) => void;
	handleVerifyOtp: (phone: string, pinId: string, otp: string) => void;
	handleLogOut: () => void;
	handleSignUp: (data: RegistrationData) => void;
}

const defaultContext = {
	authState: {
		token: null,
		authenticated: false,
	},
	loading: false,
	handleSignIn: (email: string, password: string) => {},
	handleSendOtp: (phone: string) => {},
	handleVerifyOtp: (phone: string, pinId: string, otp: string) => {},
	handleLogOut: () => {},
	handleSignUp: (data: RegistrationData) => {},
};

const TOKEN_KEY = 'authToken';

export const AuthContext = createContext<AuthData>(defaultContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { setPinId, setPhone } = useBoundStore((state) => state);
	const [authState, setAuthState] = useState<{
		token: string | null;
		authenticated: boolean;
	}>({
		token: null,
		authenticated: false,
	});
	const [loading, setLoading] = useState(false);

	// * Load Token from secure store if it exists
	useEffect(() => {
		async function loadToken() {
			const token = getFromSecureStore(TOKEN_KEY);
			console.log('🚀 ~ loadedTokenFromStore ~ token:', token);
			if (token)
				setAuthState((state) => ({
					...state,
					token: token,
					authenticated: true,
				}));
		}
		loadToken();
	}, []);

	const handleSignUp = async (data: RegistrationData) => {
		try {
			const res = await axios.post<RegistrationResponse>(
				`${process.env.EXPO_API_URL}/register`,
				{
					...data,
				}
			);
			const { pinId } = res.data;
			if (pinId) setPinId(pinId);
		} catch (error) {
			console.log(error);
		}
	};

	// const handleSignIn = async (email: string, password: string) => {
	// 	try {
	// 		setLoading(true);
	// 		const { user } = await signInWithEmailAndPassword(auth, email, password);
	// 		setLoading(false);
	// 		const token = await user.getIdToken();
	// 		console.log('🚀 ~ handleSignIn ~ token:', token);
	// 		if (token) {
	// 			// * User was authenticated
	// 			setAuthState((state) => ({
	// 				...state,
	// 				token: token,
	// 				authenticated: true,
	// 			}));
	// 			// * Save token to secure storage
	// 			await saveToSecureStore('authToken', token);
	// 			// * Set auth token in header
	// 			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const handleLogOut = async () => {
		try {
			// const loggedOut = await kindeClient.logout(true);
			// if (loggedOut) {
			// 	// User was logged out
			// 	setAuthState({ token: null, authenticated: false });
			// 	// Delete token from storage
			// 	await deleteFromSecureStore(TOKEN_KEY);
			// }
		} catch (error) {}
	};
	const handleSendOtp = async (phone: string) => {
		try {
			setLoading(true);
			setPhone(phone);
			const { pinId } = await sendOtpToPhone(phone);
			setPinId(pinId);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleVerifyOtp = async (phone: string, pinId: string, otp: string) => {
		try {
			setLoading(true);
			const { verified, access_token } = await verifyOtp(phone, pinId, otp);
			if (verified && access_token) {
				console.log('🚀 ~ handleSignIn ~ token:', access_token);
				// * User was authenticated
				setAuthState((state) => ({
					...state,
					token: access_token,
					authenticated: true,
				}));
				// * Save token to secure storage
				await saveToSecureStore('authToken', access_token);
				// * Set auth token in header
				axios.defaults.headers.common['Authorization'] =
					`Bearer ${access_token}`;
				setLoading(false);
			}
		} catch (error) {}
	};

	return (
		<AuthContext.Provider
			value={{
				authState,
				handleLogOut,
				handleSignUp,
				loading,
				handleSendOtp,
				handleVerifyOtp,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
