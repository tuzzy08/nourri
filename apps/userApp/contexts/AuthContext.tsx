import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthData {
	authState?: { token: string | null; authenticated: boolean };
	handleSignIn?: (email: string, password: string) => void;
	handleLogOut?: () => void;
	handleSignUp?: (email: string, password: string) => void;
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [authState, setAuthState] = useState<{
		token: any;
		authenticated: boolean;
	}>({
		token: null,
		authenticated: false,
	});

	// * Load Token from secure store if it exists
	useEffect(() => {
		async function loadToken() {
			const token = await getFromSecureStore(TOKEN_KEY);
			if (token) setAuthState({ token: token, authenticated: true });
		}
		loadToken();
	}, []);

	const handleSignUp = async (email: string, password: string) => {
		try {
			// const token = await kindeClient.register();
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const token = await user.getIdToken();
			console.log(token);
			// const token = await kindeClient.register();
			if (token) {
				// * User was authenticated
				setAuthState({ token: token, authenticated: true });
				// * Save token to secure storage
				await saveToSecureStore(TOKEN_KEY, token);
				// * Set auth token in header
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignIn = async (email: string, password: string) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			const token = await user.getIdToken();
			console.log('🚀 ~ handleSignIn ~ token:', token);
			if (token) {
				// * User was authenticated
				setAuthState({ token: token, authenticated: true });
				// * Save token to secure storage
				await saveToSecureStore('authToken', token);
				// * Set auth token in header
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			}
		} catch (error) {
			console.log(error);
		}
	};

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

	return (
		<AuthContext.Provider
			value={{ authState, handleLogOut, handleSignIn, handleSignUp }}
		>
			{children}
		</AuthContext.Provider>
	);
}
