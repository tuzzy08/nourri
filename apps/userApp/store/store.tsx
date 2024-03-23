import { create, StateCreator } from 'zustand';

interface UserLocationSlice {
	userPosition: {
		longitude: string;
		latitude: string;
	};
	userGeoHash: string;
	currentAddress: string;
	deliveryAddress: string;
	setPosition: (coordinates: { longitude: string; latitude: string }) => void;
	setGeoHash: (geoHash: string) => void;
	setCurrentAddress: (address: string) => void;
	setDeliveryAddress: (address: string) => void;
}
interface CartItem {
	itemId: string;
	itemTitle: string;
	itemVendorId: string;
	itemVendorTitle: string;
	itemQty: string;
	itemPrice: number;
}
interface CartSlice {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	deleteItem: (item: CartItem) => void;
	updateItemQty: (item: CartItem) => void;
	clearCart: () => void;
}
// Create Store Slices
const createLocationSlice: StateCreator<
	UserLocationSlice,
	[],
	[],
	UserLocationSlice
> = (set) => ({
	userPosition: {
		longitude: '',
		latitude: '',
	},
	userGeoHash: '',
	currentAddress: '',
	deliveryAddress: '',
	setPosition: (coordinates: { longitude: string; latitude: string }) =>
		set((state) => ({
			userPosition: {
				...state.userPosition,
				...coordinates,
			},
		})),
	setGeoHash: (geoHash: string) => set(() => ({ userGeoHash: geoHash })),
	setCurrentAddress: (address: string) =>
		set(() => ({ currentAddress: address })),
	setDeliveryAddress: (address: string) =>
		set(() => ({ deliveryAddress: address })),
});

const creatCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set) => ({
	items: [],
	addItem: (item: CartItem) =>
		set((state) => ({
			items: [...state.items, item],
		})),
	deleteItem: (item: CartItem) =>
		set((state) => {
			const currentItems = [...state.items];
			return {};
		}),
	updateItemQty: (item: CartItem) => {},
	clearCart: () => {},
});
