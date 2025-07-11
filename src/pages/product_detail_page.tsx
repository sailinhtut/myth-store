'use client';
import { useParams } from 'react-router-dom';
import { Button } from '../css/shadcn/components/ui/button';
import useProductStore, { type Product } from '../stores/product_store';
import { useEffect, useState } from 'react';
import NavBar from '../components/nav_bar';
import useCartStore from '../stores/cart_store';

export default function ProductDetailPage() {
	const { product_id } = useParams();

	const [product, setProduct] = useState<Product | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const { fetchProduct } = useProductStore();

	const {
		showCartTray,
		setShowCartTray,
		cartItems,
		addToCart,
		increaseQuantity,
		removeFromCart,
		decreaseQuantity,
		isInCart,
		totalItems,
		totalPrice,
	} = useCartStore();

	useEffect(function () {
		loadData();
	}, [product_id]);

	const loadData = async () => {
		if (!product_id) return;
		setLoading(true);
		const product = await fetchProduct(parseInt(product_id));
		setProduct(product);
		setLoading(false);
	};

	return (
		<div className=''>
			<NavBar />
			<div className='p-5 pt-10'>
				{loading && <p className='text-gray-500'>Loading Product</p>}
				{!loading && product && (
					<div>
						<img
							src={product.image}
							alt={product.title}
							className='size-[300px] object-contain group-hover:scale-110 transition-all duration-300'
						/>
						<p className='text-lg font-semibold mt-3 line-clamp-1'>
							{product.title}
						</p>
						<p className='line-clamp-3'>{product.description}</p>
						<p className='text-green-800 mt-3 mb-3'>{product.price} $</p>
						<Button
							onClick={() => window.history.back()}
							variant='secondary'
							className='mr-3'>
							Back
						</Button>
						<Button
							className='group-hover:-translate-y-1'
							onClick={() => addToCart(product)}>
							Add to Cart
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
