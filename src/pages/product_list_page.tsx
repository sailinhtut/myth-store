import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../css/shadcn/components/ui/button';
import useProductStore from '../stores/product_store';
import NavBar from '../components/nav_bar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../css/shadcn/components/ui/tooltip';
import { appName } from '../utils/constants';
import useCartStore from '../stores/cart_store';
import { ChevronDown, ChevronRight, Divide, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Badge } from '../css/shadcn/components/ui/badge';
import { useState } from 'react';
import { useDeviceType } from '../utils/device_type';

export default function ProductListPage() {
	const { products } = useProductStore();
	const navigate = useNavigate();
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
	const deviceType = useDeviceType();

	return (
		<div>
			<NavBar />
			<div className='lg:w-4/5 min-h-screen grid md:grid-cols-3 gap-5 items-center justify-center p-5 md:p-10 mt-[75px]'>
				{products.map((product) => (
					<div className='bg-card border p-3 rounded-md group overflow-hidden select-none'>
						<Link to={`/products/${product.id}`}>
							<img
								src={product.image}
								alt={product.title}
								className='size-[300px] object-contain group-hover:scale-110 transition-all duration-300'
							/>
							<Tooltip>
								<TooltipTrigger>
									<p className='text-lg font-semibold mt-3 line-clamp-1'>
										{product.title.trim()}
									</p>
								</TooltipTrigger>
								<TooltipContent>{product.title.trim()}</TooltipContent>
							</Tooltip>

							<p className='line-clamp-3'>{product.description.trim()}</p>
							<p className='text-2xl mt-3 mb-3 font-bold '>
								{product.price} $
							</p>
						</Link>
						<Button
							onClick={(event) => {
								event.stopPropagation();
								addToCart(product);
							}}
							className='group-hover:-translate-y-1'>
							Add to Cart
						</Button>
					</div>
				))}
			</div>

			{!showCartTray && deviceType !== 'mobile' && (
				<div
					className='py-4 px-4 bg-primary hover:bg-card text-foreground border fixed bottom-1/5 right-0 rounded-tl-lg rounded-bl-lg transition-all duration-300 group flex items-center gap-3 translate-x-3/5 hover:translate-x-0 select-none cursor-pointer'
					onClick={() => setShowCartTray(!showCartTray)}>
					<ShoppingCart className='group-hover:w-0 group-hover:-translate-x-full translate-x-0 transition-all duration-300' />
					<div className='translate-x-full group-hover:translate-0 transition-all duration-300'>
						Cart Menu
					</div>
					{totalItems() > 0 && (
						<Badge
							variant='secondary'
							className='rounded-sm px-2 bg-card border-primary absolute -top-2 -left-2 group-hover:bg-primary'>
							{cartItems.length}+
						</Badge>
					)}
				</div>
			)}

			<footer className='bg-black text-white text-center py-6'>
				<p>
					&copy; {new Date().getFullYear()} {appName}. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
