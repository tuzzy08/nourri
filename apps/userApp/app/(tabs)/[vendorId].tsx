import { StyleSheet, useColorScheme } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '@/components/Themed';
import { Header } from '@/components/RestaurantView';

export default function Page() {
	const vendor = useLocalSearchParams();
	const url = vendor.imgUrl as string;
	const res = parseInt(url);
	const colorScheme = useColorScheme();

	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar
					translucent={true}
					style={colorScheme === 'dark' ? 'light' : 'dark'}
				/>
				<View style={{ flex: 1 }}>
					<Header imgUrl={res} />
					<Text>restaurantView</Text>
				</View>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({});
