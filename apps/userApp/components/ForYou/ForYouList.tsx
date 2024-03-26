import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from '@/components/Themed';
import data from './data';
import { ForYouItem } from './ForYouItem';
import Colors from '@/constants/Colors';

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
				// ItemSeparatorComponent={() => {
				// 	return (
				// 		<View
				// 			style={{
				// 				height: '100%',
				// 				width: '20%',
				// 			}}
				// 		/>
				// 	);
				// }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		// borderColor: Colors.grey,
		// borderWidth: 0.5,
	},
});
