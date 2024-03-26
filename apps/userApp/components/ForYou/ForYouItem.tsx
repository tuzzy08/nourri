import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../Themed';
import Colors from '@/constants/Colors';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image, ImageSource } from 'expo-image';
import { Rating } from '../Rating';
import { useRouter } from 'expo-router';
type ImgUrl =
	| string
	| number
	| ImageSource
	| ImageSource[]
	| string[]
	| null
	| undefined;

type ForYouItem = {
	id: number;
	title: string;
	imgUrl: ImgUrl;
	href: string;
	rating: number;
	startingPrice: number;
};

export function ForYouItem({ item }: { item: ForYouItem }) {
	console.log('🚀 ~ ForYouItem ~ item:', item);
	const router = useRouter();

	return (
		<TouchableOpacity
			onPress={() =>
				router.navigate({
					params: { vendorId: item.id, imgUrl: item.imgUrl },
					pathname: `/[vendorId]`,
				})
			}
		>
			<View style={styles.itemContainer}>
				<Image source={item.imgUrl} style={styles.itemImage} />
				<View style={styles.footer}>
					<View style={styles.footerTop}>
						<Text style={{ paddingVertical: 3 }}>{item.title}</Text>
					</View>
					<View style={styles.footerBottom}>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={{ fontSize: 11 }}
							>{`From  ₦${item.startingPrice} | `}</Text>
							<Text style={{ fontSize: 11, color: Colors.primary }}>
								Closed
							</Text>
						</View>

						<Rating rating={item.rating} />
					</View>
				</View>
				{/* <Text style={styles.itemTitle}>{item.title}</Text> */}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		// flex: 1,
		height: 250,
		width: 250,
		// borderWidth: 0.5,
		// borderColor: Colors.primary,
		// alignItems: 'center',
		marginRight: 9,
		// padding: 5,
		gap: 5,
	},
	itemImage: {
		height: 150,
		width: '100%',
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
	footer: {
		height: '100%',
		width: '100%',
		// borderWidth: 0.5,
		// borderColor: 'blue',
		gap: 4,
	},
	footerTop: {
		// height: '50%',
		// width: '100%',
		// borderWidth: 0.5,
		// borderColor: 'green',
		paddingHorizontal: 3,
	},
	footerBottom: {
		// borderWidth: 0.5,
		// borderColor: 'marroon',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 3,
	},
});
