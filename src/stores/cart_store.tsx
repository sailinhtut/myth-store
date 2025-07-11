import { create } from 'zustand';
import type { Product } from './product_store';
import { toast } from 'sonner';

interface CartItem extends Product {
	quantity: number;
}

interface CartStoreState {
	cartItems: CartItem[];
	showCartTray: boolean;
	setShowCartTray: (status: boolean) => void;
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	clearCart: () => void;
	increaseQuantity: (productId: number) => void;
	decreaseQuantity: (productId: number) => void;
	isInCart: (id: number) => boolean;
	totalItems: () => number;
	totalPrice: () => number;
	checkout: () => void;
}

const useCartStore = create<CartStoreState>((set, get) => ({
	cartItems: [],
	showCartTray: false,
	setShowCartTray: (status: boolean) => set({ showCartTray: status }),
	addToCart: (product) => {
		const cartItems = get().cartItems;
		const itemIndex = cartItems.findIndex((item) => item.id === product.id);

		if (itemIndex > -1) {
			// Product already in cart — increase quantity
			const updatedCart = cartItems.map((item, index) =>
				index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
			);
			set({ cartItems: updatedCart });
		} else {
			// New product — add with quantity 1
			set({ cartItems: [...cartItems, { ...product, quantity: 1 }] });
		}

		const cartItem = get().cartItems.find((item) => item.id === product.id);
		if (cartItem) {
			toast(`${product.title} is added to cart. Total Quantity - ${cartItem?.quantity}`, {
				action: {
					label: 'Undo',
					onClick: () => get().decreaseQuantity(cartItem!.id),
				},
			});
		}
	},

	removeFromCart: (productId) => {
		const filtered = get().cartItems.filter((item) => item.id !== productId);
		set({ cartItems: filtered });
	},

	clearCart: () => set({ cartItems: [] }),

	increaseQuantity: (productId) => {
		const updatedCart = get().cartItems.map((item) =>
			item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
		);
		set({ cartItems: updatedCart });
	},

	decreaseQuantity: (productId) => {
		const updatedCart = get()
			.cartItems.map((item) =>
				item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
			)
			.filter((item) => item.quantity > 0);
		set({ cartItems: updatedCart });
	},
	isInCart: (id: number) => {
		const existed = get().cartItems.findIndex((item) => item.id === id);
		return existed > -1;
	},
	totalItems: () => {
		return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
	},

	totalPrice: () => {
		const totalCost = get().cartItems.reduce(
			(sum, item) => sum + item.quantity * item.price,
			0
		);
		return parseFloat(totalCost.toFixed(2));
	},
	checkout: () => {
		if (get().cartItems.length === 0) {
			toast('No Item To Check Out');
			return;
		}
		set({ cartItems: [] });
		toast('Successfully Check Out');
	},
}));

export default useCartStore;
