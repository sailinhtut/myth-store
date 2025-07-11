import { Button } from '../css/shadcn/components/ui/button';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import { Badge } from '../css/shadcn/components/ui/badge';
import useCartStore from '../stores/cart_store';
import { useDeviceType } from '../utils/device_type';
import { useAuthStore } from '../stores/auth_store';
import { useNavigate } from 'react-router-dom';

export default function CartTray() {
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
	const { isLoggedIn } = useAuthStore();
	const navigate = useNavigate();
	const deviceType = useDeviceType();

	return (
		<div
			className={
				deviceType === 'mobile'
					? `bg-background border border-t-primary p-5 w-full fixed bottom-0 z-20 ${
							showCartTray
								? 'h-[600px] translate-0 opacity-100'
								: 'h-0 translate-y-full opacity-100'
					  }`
					: `bg-background border border-primary shadow rounded-tl-lg rounded-tr-lg p-5 w-[450px] h-[500px] fixed right-10 transition-all duration-500 z-20 ${
							showCartTray ? 'bottom-0 h-auto' : '-bottom-full h-0'
					  }`
			}>
			<div className='flex justify-between items-center'>
				<p className='text-lg font-semibold'>Cart Preview</p>
				<Button variant='ghost' size='icon' onClick={() => setShowCartTray(false)}>
					<ChevronDown />
				</Button>
			</div>
			<div className='h-[380px] w-full mt-3 flex flex-col gap-3 overflow-y-scroll'>
				{cartItems.map((cartItem) => (
					<div className='bg-card py-3 px-3 shadow-sm border rounded-lg'>
						<div className='flex gap-5'>
							<img
								src={cartItem.image}
								alt={cartItem.title}
								className='w-20 h-auto rounded-md border border-slate-300 object-fill'
							/>
							<div className='w-full'>
								<div className='flex justify-between items-center'>
									<p
										className='w-2/3 line-clamp-1 cursor-pointer'
										onClick={() =>
											navigate(`/products/${cartItem.id}`)
										}>
										{cartItem.title}
									</p>
									<p className='font-bold '>
										{cartItem.quantity * cartItem.price} $
									</p>
								</div>
								<div className='mt-3 flex justify-between items-center'>
									<Badge className='bg-gray-200 text-black'>
										Quantity {cartItem.quantity}
									</Badge>
									<div className='flex flex-row gap-3'>
										<Button
											variant='outline'
											size='icon'
											onClick={() =>
												decreaseQuantity(cartItem.id)
											}>
											<Minus />
										</Button>
										<Button
											variant='outline'
											size='icon'
											onClick={() =>
												increaseQuantity(cartItem.id)
											}>
											<Plus />
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='mt-5 flex justify-between items-end'>
				<p>
					Total Item - <strong>{cartItems.length}</strong>
					<br></br>
					Total Cost - <strong>{totalPrice().toFixed(2)} $</strong>
				</p>

				<Button
					onClick={() => {
						if (!isLoggedIn) {
							navigate('/login');
							return;
						}
						setShowCartTray(false);
						navigate('/check-out');
					}}
					disabled={cartItems.length === 0}>
					Check Out
				</Button>
			</div>
		</div>
	);
}
