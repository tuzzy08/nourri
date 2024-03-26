import { ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, View } from '@/components/Themed';
import { CategoryList } from '@/components/Categories/CategoryList';
import { Banner } from '@/components/Banner';
import { ForYou } from '@/components/ForYou';
import Colors from '@/constants/Colors';

export default function Page() {
	const colorScheme = useColorScheme();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View
					style={[
						styles.container,
						{
							backgroundColor:
								colorScheme === 'light' ? Colors.lightGrey : '#000',
						},
					]}
				>
					<View style={{ marginTop: -4 }}>
						<CategoryList />
					</View>
					<View style={styles.banner}>
						<Banner />
					</View>
					<View style={styles.foryouContainer}>
						<View style={styles.foryou}>
							<Text style={styles.foryouHeaderText}>For You</Text>
							<ForYou />
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flexGrow: 1,
	},
	container: { flex: 1 },
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	banner: {
		alignItems: 'center',
		marginTop: -35,
	},
	foryouContainer: {},
	foryou: {
		marginTop: 25,
		paddingHorizontal: 14,
		// marginLeft: 17,
		// gap: 7,
		// borderWidth: 0.5,
		// borderColor: Colors.secondary,
	},
	foryouHeaderText: {
		fontSize: 16,
		fontWeight: '600',
	},
});
