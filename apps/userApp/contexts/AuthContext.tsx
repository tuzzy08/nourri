import { createContext, useEffect, useState } from 'react';
import kindeClient from '@/lib/kinde';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthData {
	authState?: { token: string | null; authenticated: boolean };
	handleSignIn?: () => void;
	handleLogOut?: () => void;
	handleSignUp?: () => void;
}

const defaultContext = {
	authState: {
		token: null,
		authenticated: false,
	},
};

const TOKEN_KEY = 'authToken';

async function saveToSecureStore(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

async function getFromSecureStore(key: string) {
	let result = await SecureStore.getItemAsync(key);
	return result;
}

async function deleteFromSecureStore(key: string) {
	await SecureStore.deleteItemAsync(key);
}

export const AuthContext = createContext<AuthData>(defaultContext);

export function AuthProvider() {
	const [authState, setAuthState] = useState<{
		token: any;
		authenticated: boolean;
	}>({
		token: null,
		authenticated: false,
	});

	useEffect(() => {
		async function loadToken() {
			const token = await getFromSecureStore(TOKEN_KEY);
			if (token) setAuthState({ token: token, authenticated: true });
		}
		loadToken();
	}, []);

	const handleSignUp = async () => {
		try {
			const token = await kindeClient.register();
			if (token) {
				// * User was authenticated
				setAuthState({ token: token, authenticated: true });
				// * Save token to secure storage
				await saveToSecureStore(TOKEN_KEY, token.access_token);
				// * Set auth token in header
				axios.defaults.headers.common['Authorization'] =
					`Bearer ${token.access_token}`;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignIn = async () => {
		try {
			const token = await kindeClient.login();
			if (token) {
				// * User was authenticated
				setAuthState({ token: token, authenticated: true });
				// * Save token to secure storage
				await saveToSecureStore('authToken', token.access_token);
				// * Set auth token in header
				axios.defaults.headers.common['Authorization'] =
					`Bearer ${token.access_token}`;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogOut = async () => {
		try {
			const loggedOut = await kindeClient.logout(true);
			if (loggedOut) {
				// User was logged out
				setAuthState({ token: null, authenticated: false });
				// Delete token from storage
				await deleteFromSecureStore(TOKEN_KEY);
			}
		} catch (error) {}
	};

	return (
		<AuthContext.Provider
			value={{ authState, handleLogOut, handleSignIn, handleSignUp }}
		></AuthContext.Provider>
	);
}
