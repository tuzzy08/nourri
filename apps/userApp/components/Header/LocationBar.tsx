import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { MapPin, ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export function LocationBar() {
	const colorScheme = useColorScheme();
	return (
		<View style={styles.container}>
			<TouchableOpacity>
				<View style={styles.addressBox}>
					<MapPin
						size={12}
						color={colorScheme === 'dark' ? Colors.primary : Colors.light.text}
					/>
					<Text style={styles.addressText}>#3 Joshua Close,</Text>
					<ChevronDown
						size={19}
						color={
							colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
						}
						style={{ marginTop: 3 }}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	addressBox: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 3,
	},
	addressText: {
		fontSize: 13,
	},
});
