import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from '../Themed';
import data from './data';
import { MenuItem } from './MenuItem';
import Colors from '@/constants/Colors';
import { Categories } from './Categories';
import { Dispatch, SetStateAction, useState } from 'react';

export function Menu() {
	const [active, setActive] = useState('All');
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					borderBottomWidth: 0.2,
					borderColor: Colors.lightGrey,
				}}
			>
				<Categories category={active} setCategory={setActive} />
			</View>

			<MenuList />
		</View>
	);
}

function MenuList() {
	return (
		<View style={styles.menu}>
			<FlashList
				data={data}
				renderItem={({ item }) => <MenuItem item={item} />}
				estimatedItemSize={12}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		marginHorizontal: 10,
		marginTop: 10,

		// borderWidth: 0.5,
		// borderColor: Colors.secondary,
	},
});
