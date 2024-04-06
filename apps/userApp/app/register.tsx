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
				{/* <Image source={src} style={styles.image} /> */}
				{/* <Text>login</Text> */}
				<View style={styles.form}>
					{/* Phone Number */}
					<View style={{ gap: 10 }}>
						<Text style={styles.label}>
							Phone Number <Text style={styles.required}>*</Text>
						</Text>
						<TextInput style={styles.input} placeholder='' />
					</View>
					{/* Email */}
					<View style={{ gap: 10 }}>
						<Text>
							Email address <Text style={styles.required}>*</Text>
						</Text>
						<TextInput style={styles.input} placeholder='' />
					</View>
					{/* First & Last Names Container */}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						{/* First Name */}
						<View style={{ gap: 5 }}>
							<Text>
								First Name <Text style={styles.required}>*</Text>
							</Text>
							<TextInput
								style={{
									height: hp('6%'),
									width: wp('41%'),
									backgroundColor: Colors.grey,
									borderRadius: 15,
									paddingHorizontal: 10,
								}}
								placeholder=''
							/>
						</View>
						{/* Last Name */}
						<View style={{ gap: 5 }}>
							<Text>
								Last Name <Text style={styles.required}>*</Text>
							</Text>
							<TextInput
								style={{
									height: hp('6%'),
									width: wp('41%'),
									backgroundColor: Colors.grey,
									borderRadius: 15,
									paddingHorizontal: 10,
								}}
								placeholder=''
							/>
						</View>
					</View>
					{/* BirthDate */}
					<Text>Birthdate</Text>
					<TextInput style={styles.input} placeholder='enter birth date' />
					<Text>Referral Code</Text>
					<TextInput style={styles.input} placeholder='enter code(if any)' />
					<View style={{ marginTop: 25 }}>
						<TouchableOpacity style={styles.button}>
							<Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
								Register
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
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 100,
	},
	image: {
		width: 400,
		height: 400,
		marginRight: 20,
		marginTop: 30,
	},
	form: {
		borderWidth: 0.5,
		borderColor: Colors.secondary,
		borderRadius: 20,
		width: wp('95%'),
		// height: hp('70%'),
		// justifyContent: 'center',
		// alignItems: 'center',
		gap: 20,
		marginTop: 30,
		padding: 10,
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
	required: {
		color: Colors.primary,
	},
	label: {
		alignSelf: 'flex-start',
	},
});
