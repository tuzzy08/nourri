import { StyleSheet, Text, View } from 'react-native';
import { Map } from '@/components/Map';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useBoundStore } from '@/store/store';

export default function Page() {
	const userLocation = useBoundStore((state) => state.userLocation);
	const setUserLocation = useBoundStore((state) => state.setUserLocation);
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
			console.log(location);
			setUserLocation(location);

			// setLocation(location);
			// const address = await Location.reverseGeocodeAsync(location, {
			// 	useGoogleMaps: true,
			// });
			// console.log('🚀 ~ address:', address);
		})();
	}, []);
	return (
		<View style={styles.container}>
			<Map initialCoords={userLocation} style={styles.mapView} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mapView: {
		height: hp('100%'),
		width: wp('100%'),
	},
});
