import { FlashList } from '@shopify/flash-list';
import { StyleSheet, Text, View } from 'react-native';
import data from '../ForYou/data';
import { VendorCard } from '../VendorCard';

export function Restaurants() {
	return (
		<View style={{ flex: 1 }}>
			<FlashList
				data={data}
				renderItem={({ item }) => (
					<VendorCard
						item={item}
						style={{ marginBottom: 30, width: '100%', height: 250 }}
					/>
				)}
				estimatedItemSize={15}
				contentContainerStyle={{ paddingHorizontal: 1 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
