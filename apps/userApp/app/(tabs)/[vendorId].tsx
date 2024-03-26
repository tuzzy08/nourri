import { SafeAreaView, StyleSheet } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { Header } from '@/components/RestaurantView';

export default function Page() {
	const vendor = useLocalSearchParams();
	console.log('🚀 ~ Page ~ vendor:', vendor);
	const url = vendor.imgUrl as string;
	const res = parseInt(url);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<Header imgUrl={res} />
				<Text>restaurantView</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
