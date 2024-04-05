import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
} from 'react-native';
import { Image } from 'expo-image';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function Page() {
	const src = require('@/assets/images/delivery.png');
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			<View style={styles.container}>
				<Image source={src} style={styles.image} />
				<Text>login</Text>
				<View style={styles.form}>
					<Text>Email</Text>
					<TextInput style={styles.input} />
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 400,
		height: 400,
		marginRight: 20,
		marginTop: 30,
	},
	form: {
		borderWidth: 0.5,
		borderColor: '#FFF',
		borderRadius: 15,
		width: wp('95%'),
		height: hp('40%'),
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		height: hp('6%'),
		width: wp('85%'),
		backgroundColor: Colors.grey,
	},
});
