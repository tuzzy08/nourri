import { StyleSheet, useColorScheme } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
	BottomSheetView,
	BottomSheetModal,
	BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
// import {
// 	widthPercentageToDP as wp,
// 	heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
import data from './data';
import { MenuItem } from './MenuItem';
import Colors from '@/constants/Colors';
import { Categories } from './Categories';
import { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text } from '../Themed';

export function Menu() {
	const [active, setActive] = useState('All');
	// * Backdrop Component
	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.3}
				// * Disables touch outside bottom sheet to close
				pressBehavior={'none'}
			/>
		),
		[]
	);
	// * Reference to BottomSheet Modal
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	// * Modal SnapPoints
	const snapPoints = useMemo(() => ['85%'], []);
	// * Modal Callbacks
	const showModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);
	const colorScheme = useColorScheme();
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
			<MenuList showModal={showModal} />
			{/* Meal Options Bottom Sheet	 */}

			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				backdropComponent={renderBackdrop}
				handleStyle={{
					display: 'none',
				}}
				// * Disables sliding either the content or handle to close the bottom sheet.
				// enableContentPanningGesture={false}
				// enableHandlePanningGesture={false}
			>
				<BottomSheetView style={styles.contentContainer}>
					<View style={styles.bottomSheetImage}></View>
					<Text>Awesome 🎉</Text>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	);
}

function MenuList({ showModal }: { showModal: () => void }) {
	return (
		<View style={styles.menu}>
			<FlashList
				data={data}
				renderItem={({ item }) => (
					<MenuItem showModal={showModal} item={item} />
				)}
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
	},
	contentContainer: {
		flex: 1,
	},
	bottomSheetImage: {
		height: '30%',
		backgroundColor: Colors.grey,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
});
