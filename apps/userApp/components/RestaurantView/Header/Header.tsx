import { SafeAreaView, StyleSheet } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image, ImageSource } from 'expo-image';
import Colors from '@/constants/Colors';
import { Text, View } from '../../Themed';
import { ArrowLeft } from 'lucide-react-native';

const bg = require('@/assets/images/vendors/m_gardens/m_logo.jpg');
console.log('bg', bg);

type ImgUrl = string | number | ImageSource | ImageSource[] | string[] | null;

export function Header({ imgUrl }: { imgUrl: any }) {
	console.log('in header', imgUrl);
	const num = imgUrl as number;
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Image source={imgUrl} style={styles.image} />
				<Text>Header</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('30%'),
		width: wp('100%'),
		// borderWidth: 0.5,
		// borderColor: Colors.primary,
	},
	image: { height: '100%', width: '100%', backgroundColor: 'blue' },
});
