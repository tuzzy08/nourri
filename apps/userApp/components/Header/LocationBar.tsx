import { StyleSheet, Text, View } from 'react-native';

export function LocationBar() {
	return (
		<View style={styles.container}>
			<Text style={styles.addressText}>LocationBar</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	addressText: {
		fontSize: 16,
	},
});
