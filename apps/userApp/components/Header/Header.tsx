import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';
import { LocationBar } from './LocationBar';
import { Bell } from 'lucide-react-native';
import { Link } from 'expo-router';

export function Header() {
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', marginTop: 15, padding: 8 }}>
				<View style={styles.profileIcon} />
				<LocationBar />
				{/* <TouchableOpacity> */}
				<Link href={'/notifications'} asChild>
					<Bell
						size={22}
						style={{ alignSelf: 'flex-end' }}
						color={Colors.lightGrey}
					/>
				</Link>

				{/* </TouchableOpacity> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('14%'),
		// backgroundColor: Colors.primary,
		justifyContent: 'center',
	},
	profileIcon: {
		width: 28,
		height: 28,
		borderRadius: 30,
		backgroundColor: '#FFF',
	},
});
