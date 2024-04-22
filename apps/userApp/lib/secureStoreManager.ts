import * as SecureStore from 'expo-secure-store';

export async function saveToSecureStore(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

export function getFromSecureStore(key: string) {
	return SecureStore.getItem(key);
}

export async function deleteFromSecureStore(key: string) {
	await SecureStore.deleteItemAsync(key);
}
