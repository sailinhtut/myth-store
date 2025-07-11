import { create } from 'zustand';

export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	image: string;
}

interface ProductStoreState {
	products: Product[];
	fetchProducts: () => void;
	fetchProduct: (id: number) => Promise<Product | undefined>;
}

const useProductStore = create<ProductStoreState>(function (set) {
	return {
		products: [],
		fetchProducts: async () => {
			const response = await fetch('https://fakestoreapi.com/products');
			if (response.status === 200) {
				const json_data = await response.json();
				set({
					products: json_data,
				});
			}
		},
		fetchProduct: async (id: number) => {
			const response = await fetch('https://fakestoreapi.com/products/' + id);
			if (response.status === 200) {
				const json_data = await response.json();
				return json_data;
			}
			return undefined;
		},
	};
});

export default useProductStore;
