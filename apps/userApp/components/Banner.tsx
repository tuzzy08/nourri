import { StyleSheet, View as UnsThemedView } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from './Themed';
import Colors from '@/constants/Colors';

export function Banner() {
	return (
		<View>
			<UnsThemedView style={styles.banner}></UnsThemedView>
		</View>
	);
}

const styles = StyleSheet.create({
	banner: {
		width: wp('87%'),
		height: hp('12%'),
		borderColor: Colors.primary,
		borderWidth: 0.4,
	},
});
