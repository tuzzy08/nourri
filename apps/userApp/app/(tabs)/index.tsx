import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native';
import { CategoryList } from '@/components/Categories/CategoryList';
import { Banner } from '@/components/Banner';
import { ForYou } from '@/components/ForYou';

export default function Page() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}
			>
				<View style={{ flex: 1 }}>
					<View style={{ marginTop: -2 }}>
						<CategoryList />
					</View>
					<View style={styles.banner}>
						<Banner />
					</View>
					<View style={styles.foryou}>
						<View style={{}}>
							<Text style={styles.foryouHeaderText}>For You</Text>
						</View>
						<ForYou />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	banner: {
		alignItems: 'center',
	},
	foryou: {
		marginTop: 25,
		marginLeft: 6,
		gap: 7,
	},
	foryouHeaderText: {
		fontSize: 16,
		fontWeight: '600',
	},
});
