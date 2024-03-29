import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from '../Themed';
import data from './data';
import { MenuItem } from './MenuItem';
import Colors from '@/constants/Colors';

export function Menu() {
	return (
		<View style={styles.menu}>
			<FlashList
				data={data}
				renderItem={({ item }) => <MenuItem item={item} />}
				estimatedItemSize={12}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		// borderWidth: 0.5,
		// borderColor: Colors.secondary,
	},
});
