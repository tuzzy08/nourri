import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
	Text,
} from 'react-native';
import { Image } from 'expo-image';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Page() {
	const src = require('@/assets/images/delivery.png');
	return (
		<ScrollView style={{ flexGrow: 1 }}>
			<View style={styles.container}>
				<Image source={src} style={styles.image} />
				{/* <Text>login</Text> */}
				<View style={styles.form}>
					<TextInput style={styles.input} placeholder='Email' />
					<TextInput style={styles.input} placeholder='Password' />
					<View style={{ marginTop: 25 }}>
						<TouchableOpacity style={styles.button}>
							<Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
								Login
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
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
		// borderWidth: 0.5,
		// borderColor: '#FFF',
		// borderRadius: 15,
		width: wp('95%'),
		height: hp('40%'),
		// justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
		marginTop: 30,
	},
	input: {
		height: hp('6%'),
		width: wp('85%'),
		backgroundColor: Colors.grey,
		borderRadius: 15,
		color: 'black',
		paddingLeft: 10,
	},
	button: {
		height: hp('6%'),
		width: wp('85%'),
		borderRadius: 15,
		backgroundColor: Colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
