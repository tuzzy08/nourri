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
import { useColorScheme } from '@/components/useColorScheme';
import * as Location from 'expo-location';
import { useBoundStore } from '@/store/store';

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
	const location = useBoundStore((state) => state.userLocation);
	const setUserLocation = useBoundStore((state) => state.setUserLocation);
	const setCurrentAddress = useBoundStore((state) => state.setCurrentAddress);

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

			let {
				coords: { longitude, latitude },
			} = await Location.getCurrentPositionAsync({});
			const location = { longitude, latitude };
			setUserLocation(location);

			const google_map_api_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=street_address&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
			const response = await fetch(google_map_api_url);
			const json = await response.json();
			const address = json.results[0].formatted_address;
			setCurrentAddress(address);

			// setLocation(location);
			// const address = await Location.reverseGeocodeAsync(location, {
			// 	useGoogleMaps: true,
			// });
			// console.log('🚀 ~ address:', address);
		})();
	}, []);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<RootLayoutNav />
		</GestureHandlerRootView>
	);
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='notifications' options={{}} />
			</Stack>
		</ThemeProvider>
	);
}
