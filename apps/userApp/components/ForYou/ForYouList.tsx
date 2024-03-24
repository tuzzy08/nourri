import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from '@/components/Themed';
import data from './data.json';
import { ForYouItem } from './ForYouItem';

export function ForYouList() {
	return (
		<View style={styles.listContainer}>
			<FlashList
				data={data}
				renderItem={({ item }) => <ForYouItem item={item} />}
				estimatedItemSize={15}
				horizontal
				contentContainerStyle={{ paddingHorizontal: 1 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		height: hp('30%'),
	},
});
