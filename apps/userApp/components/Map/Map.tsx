import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { Text, View } from '@/components/Themed';

export function Map({
	initialCoords,
	style,
}: {
	initialCoords: { longitude: number; latitude: number };
	style: any;
}) {
	return (
		<MapView
			provider={PROVIDER_GOOGLE}
			initialRegion={{
				latitude: initialCoords.latitude,
				longitude: initialCoords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
			style={style}
			showsUserLocation
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
