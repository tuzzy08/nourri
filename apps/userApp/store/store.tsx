import { create, StateCreator,  } from 'zustand';

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
	itemQty: number;
	itemPrice: number;
}
interface CartSlice {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	deleteItem: (itemId: string) => void;
	increaseItemQty: (itemId: string) => void;
	decreaseItemQty: (itemId: string) => void;
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
		set(state => ({
			items: [...state.items, item],
		})),
	deleteItem: (itemId: string) =>
		set(state => {
			const updatedItems = [...state.items.filter((item, i) => item.itemId !== itemId)];
			return {
				items: [...updatedItems]
			};
		}),
	increaseItemQty: (itemId: string) => set(state => {
		// Fetch the item from array in state
		const item = state.items.find((item) => item.itemId === itemId);

		if(!item || (item?.itemQty < 0)) return {}
		// Update it's quantity
		item.itemQty += 1;
		return {
			// Filter out the item and merge in the updated item
			items: [...state.items.filter((item) => item.itemId !== itemId), item]
		}
	}),
	decreaseItemQty: (itemId: string) => set(state => {
		// Fetch the item from array in state
		const item = state.items.find((item) => item.itemId === itemId);

		if(!item || (item?.itemQty <= 0 )) return {}
		// Update it's quantity
		item.itemQty -= 1;
		return {
			// Filter out the item and merge in the updated item
			items: [...state.items.filter((item) => item.itemId !== itemId), item]
		}
	}),
	clearCart: () => set((state) => ({
		items: []
	})),
});

const useBoundStore = create<UserLocationSlice & CartSlice>()((...a) => ({
	...createLocationSlice(...a),
	...creatCartSlice(...a)
}))