import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, usePathname } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Home, ClipboardList, Search, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Redirect, useSegments } from 'expo-router';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Header } from '@/components/Header';
import { StatusBar } from 'expo-status-bar';
import { Header as RestaurantHeader } from '@/components/RestaurantView';
import { useAuth } from '@/hooks/useAuth';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const { authState } = useAuth();
	// * Check if the user is authenticated
	if (!authState?.authenticated || authState.token === null) {
		return <Redirect href='/register' />;
	}
	const colorScheme = useColorScheme();
	const segment = useSegments();
	// get the current page from the segment
	const page = segment[segment.length - 1];
	// create an array of list pages you want to hide the tab bar in
	const pagesToHideTabBar = ['', ''];

	return (
		<>
			<StatusBar backgroundColor={colorScheme === 'dark' ? '#000' : '#FFF'} />
			<Tabs
				backBehavior='history'
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
					tabBarStyle: {
						height: hp('10%'),
						paddingBottom: 9,
					},
					tabBarLabelStyle: { fontSize: 11 },
				}}
			>
				<Tabs.Screen
					name='index'
					options={{
						title: 'Home',
						tabBarIcon: ({ color }) => (
							<Home size={25} color={color} style={styles.tabIcon} />
						),
						header: () => <Header />,
					}}
				/>
				<Tabs.Screen
					name='orders'
					options={{
						title: 'Orders',
						tabBarIcon: ({ color }) => (
							<ClipboardList size={25} color={color} style={styles.tabIcon} />
						),
					}}
				/>

				<Tabs.Screen
					name='search'
					options={{
						title: 'Search',
						tabBarIcon: ({ color }) => (
							<Search size={25} color={color} style={styles.tabIcon} />
						),
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						title: 'Profile',
						tabBarIcon: ({ color }) => (
							<User size={25} color={color} style={styles.tabIcon} />
						),
					}}
				/>
				<Tabs.Screen
					name='[vendorId]'
					options={{
						href: null,
						headerShown: false,
						// header: () => <RestaurantHeader />,
						tabBarStyle: {
							display: page === '[vendorId]' ? 'none' : 'flex',
						},
					}}
				/>
				<Tabs.Screen
					name='(nonTabs)'
					options={{
						href: null,
					}}
				/>
			</Tabs>
		</>
	);
}

const styles = StyleSheet.create({
	tabIcon: {
		marginBottom: -3,
	},
});
