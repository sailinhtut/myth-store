import useCartStore from '../stores/cart_store';

export default function CartPage() {
	const cartItems = useCartStore((state) => state.cartItems);
	const totalPrice = useCartStore((state) => state.totalPrice());
	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
	const removeFromCart = useCartStore((state) => state.removeFromCart);

	return (
		<div>
			{cartItems.length === 0 && <p>Your cart is empty.</p>}
			{cartItems.map((item) => (
				<div key={item.id}>
					<h4>{item.title}</h4>
					<p>
						{item.quantity} × {item.price} $ = {item.quantity * item.price} $
					</p>
					<button onClick={() => increaseQuantity(item.id)}>+</button>
					<button onClick={() => decreaseQuantity(item.id)}>-</button>
					<button onClick={() => removeFromCart(item.id)}>Remove</button>
				</div>
			))}
			<h3>Total: {totalPrice.toFixed(2)} $</h3>
		</div>
	);
}
