import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../Themed';
import Colors from '@/constants/Colors';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
				<Text style={styles.itemTitle}>{item.title}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		// borderWidth: 0.5,
		// borderColor: Colors.primary,
		alignItems: 'center',
		marginRight: 5,
		padding: 5,
		gap: 5,
	},
	itemImage: {
		height: 120,
		width: 135,
		borderRadius: 6,
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
