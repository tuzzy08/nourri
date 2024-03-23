import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

type CategoryItem = {
	id: number;
	title: string;
	imgUrl: string;
	href: string;
};

export function CategoryItem({ item }: { item: CategoryItem }) {
	return (
		<TouchableOpacity>
			<View style={styles.itemContainer}>
				<View style={styles.itemImage} />
				<Text style={styles.itemTitle}>{item.title}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		maxHeight: 90,
		width: 80,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		gap: 2,
	},
	itemImage: {
		height: 55,
		width: 55,
		borderRadius: 50,
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