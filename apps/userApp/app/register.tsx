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
import { StatusBar } from 'expo-status-bar';
// import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';

export default function Page() {
	const { handleSignUp } = useAuth();

	type formDataType = {
		firstName: string;
		lastName: string;
		phone: string;
		email: string;
		birthDate: string;
		referralCode: string;
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			birthDate: '',
			referralCode: '',
		},
	});
	const onSubmit = (data: formDataType) => {
		console.log('🚀 ~ onSubmit ~ data:', data);

		// console.log('Using Firebase');
		// handleSignUp(data.email, data.);
	};

	return (
		<ScrollView style={{ flexGrow: 1 }}>
			<StatusBar style='dark' />
			<View style={styles.container}>
				{/* <Image source={src} style={styles.image} /> */}
				{/* <Text>login</Text> */}
				<View style={styles.form}>
					{/* Phone Number */}
					<View style={{ gap: 10 }}>
						<Text style={styles.label}>
							Phone Number <Text style={styles.required}>*</Text>
						</Text>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder=''
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name='phone'
						/>
						{errors.firstName && <Text>This is required.</Text>}
						{/* <TextInput style={styles.input} placeholder='' /> */}
					</View>
					{/* Email */}
					<View style={{ gap: 10 }}>
						<Text>
							Email address <Text style={styles.required}>*</Text>
						</Text>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder=''
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name='email'
						/>
						{/* <TextInput style={styles.input} placeholder='' /> */}
					</View>
					{/* First & Last Names Container */}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 10,
						}}
					>
						{/* First Name */}
						<View style={{ gap: 5 }}>
							<Text>
								First Name <Text style={styles.required}>*</Text>
							</Text>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={{
											height: hp('6%'),
											width: wp('41%'),
											backgroundColor: Colors.grey,
											borderRadius: 15,
											paddingHorizontal: 10,
										}}
										placeholder=''
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name='firstName'
							/>
							{/* <TextInput
								style={{
									height: hp('6%'),
									width: wp('41%'),
									backgroundColor: Colors.grey,
									borderRadius: 15,
									paddingHorizontal: 10,
								}}
								placeholder=''
							/> */}
						</View>
						{/* Last Name */}
						<View style={{ gap: 5 }}>
							<Text>
								Last Name <Text style={styles.required}>*</Text>
							</Text>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={{
											height: hp('6%'),
											width: wp('41%'),
											backgroundColor: Colors.grey,
											borderRadius: 15,
											paddingHorizontal: 10,
										}}
										placeholder=''
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name='lastName'
							/>
							{/* <TextInput
								style={{
									height: hp('6%'),
									width: wp('41%'),
									backgroundColor: Colors.grey,
									borderRadius: 15,
									paddingHorizontal: 10,
								}}
								placeholder=''
							/> */}
						</View>
					</View>
					{/* BirthDate */}
					<View style={{ gap: 5 }}>
						<Text>Birthdate</Text>
						<Controller
							control={control}
							rules={{
								required: false,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder=''
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name='birthDate'
						/>
						{/* <TextInput style={styles.input} placeholder='enter birth date' /> */}
					</View>

					{/* Referral Code */}
					<View style={{ gap: 5 }}>
						<Text>Referral Code</Text>
						<Controller
							control={control}
							rules={{
								required: false,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder=''
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name='referralCode'
						/>
						{/* <TextInput style={styles.input} placeholder='enter code(if any)' /> */}
					</View>

					<View style={{ marginTop: 25 }}>
						<TouchableOpacity
							style={styles.button}
							onPress={handleSubmit(onSubmit)}
						>
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
		marginTop: 130,
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
		justifyContent: 'center',
		alignItems: 'center',
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
