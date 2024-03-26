import { StyleSheet } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image, ImageSource } from 'expo-image';
import Colors from '@/constants/Colors';
import { Text, View } from '../../Themed';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native';

type ImgUrl = string | number | ImageSource | ImageSource[] | string[] | null;

export function Header({ imgUrl }: { imgUrl: any }) {
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
