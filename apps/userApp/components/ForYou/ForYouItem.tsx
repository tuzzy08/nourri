import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../Themed';
import Colors from '@/constants/Colors';

type ForYouItem = {
	id: number;
	title: string;
	imgUrl: string;
	href: string;
};

export function ForYouItem({ item }: { item: ForYouItem }) {
	return (
		<TouchableOpacity>
			<View style={styles.itemContainer}>
				<View style={styles.itemImage} />
				{/* <Text style={styles.itemTitle}>{item.title}</Text> */}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		maxHeight: 120,
		width: 120,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		gap: 2,
	},
	itemImage: {
		height: 100,
		width: 100,
		borderRadius: 5,
		backgroundColor: Colors.grey,
		elevation: 3,
		shadowColor: 'rgb(100 116 139);',
		// shadowOpacity: 0.8,
		// shadowRadius: 25,
		// shadowOffset: { width: 1, height: 13 },
	},
	itemTitle: {
		fontSize: 12,
		fontWeight: '400',
	},
});
