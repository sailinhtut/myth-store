import { useParams } from 'react-router-dom';
import { Badge } from '../css/shadcn/components/ui/badge';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '../css/shadcn/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const ordersDetails = {
	'ORD-1001': {
		status: 'Delivered',
		products: [
			{
				id: 'P1',
				name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
				qty: 2,
				price: 99,
				img: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
			},
			{
				id: 'P2',
				name: 'Mens Casual Premium Slim Fit T-Shirts',
				qty: 1,
				price: 22.3,
				img: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
			},
		],
	},
	'ORD-1002': {
		status: 'Processing',
		products: [
			{
				id: 'P3',
				name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
				qty: 1,
				price: 99,
				img: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
			},
		],
	},
	'ORD-1003': {
		status: 'Cancelled',
		products: [],
	},
};

export default function OrderHistoryDetailPage() {
	const { order_id } = useParams();
	const order = ordersDetails[order_id ?? ''] || null;

	if (!order) return <p className='text-center mt-10'>Order not found.</p>;

	return (
		<div className='flex flex-col space-y-4'>
			{/* ✅ Compact Breadcrumb */}

			<Breadcrumb className='text-sm text-muted-foreground'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to='/profile'>Profile</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to='/profile/order-history'>Order History</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className='text-foreground'>
							{order_id}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h2 className='text-lg font-semibold'>Order Details</h2>

			{/* ✅ Compact Badge */}
			<Badge
				variant={
					order.status === 'Delivered'
						? 'success'
						: order.status === 'Processing'
						? 'secondary'
						: 'destructive'
				}
				className='w-max text-xs py-0.5 px-2 rounded-sm'>
				{order.status}
			</Badge>

			{/* ✅ Product Section */}
			{order.products.length === 0 ? (
				<p className='text-center text-muted-foreground text-sm'>
					No products in this order.
				</p>
			) : (
				<div className='space-y-2'>
					{order.products.map((product) => (
						<div
							key={product.id}
							className='flex items-center gap-3 p-3 border rounded-md shadow-sm'>
							<img
								src={product.img}
								alt={product.name}
								className='w-14 h-14 object-cover rounded-md'
							/>
							<div className='flex-1'>
								<p className='text-sm font-medium'>{product.name}</p>
								<p className='text-xs text-muted-foreground'>
									Quantity: {product.qty}
								</p>
							</div>
							<p className='text-sm font-semibold'>
								${(product.price * product.qty).toFixed(2)}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
