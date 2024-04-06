import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useBoundStore } from '@/store/store';
import { useColorScheme } from '@/components/useColorScheme';
import { getAddressFromCoordinates } from '@/lib';
import { useAuth } from '@/hooks/useAuth';
import { AuthProvider } from '@/contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { Slot } from 'expo-router';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const setUserLocation = useBoundStore((state) => state.setUserLocation);
	const colorScheme = useColorScheme();
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				// setErrorMsg('Permission to access location was denied');
				return;
			}
			//  Get user's current location
			let {
				coords: { longitude, latitude },
			} = await Location.getCurrentPositionAsync({});
			const location = { longitude, latitude };
			setUserLocation(location);

			/**
			 * ! This call is billed on google, use Sparingly or use the MapBox API in development.
			 */
			// const address = await getAddressFromCoordinates(location);
			// console.log('🚀 ~ address:', address);
			// setCurrentAddress(address);
		})();
	}, []);

	if (!loaded) {
		return null;
	}

	return (
		<AuthProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ThemeProvider
					value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
				>
					<BottomSheetModalProvider>
						<Slot />
					</BottomSheetModalProvider>
				</ThemeProvider>
			</GestureHandlerRootView>
		</AuthProvider>
	);
}

// function AuthenticatedStack() {
// 	return (
// 		<Stack>
// 			<Stack.Screen name='(authenticated)' options={{ headerShown: false }} />
// 			<Stack.Screen name='notifications' options={{}} />
// 		</Stack>
// 	);
// }

// function UnAuthenticatedStack() {
// 	const colorScheme = useColorScheme();
// 	return <Stack screenOptions={{ headerShown: false }} />;
// }

// function Router() {
// 	const { authState } = useAuth();
// 	console.log(authState);
// 	return (
// 		<>
// 			{authState?.authenticated && authState.token !== null ? (
// 				<AuthenticatedStack />
// 			) : (
// 				<UnAuthenticatedStack />
// 			)}
// 		</>
// 	);
// }
