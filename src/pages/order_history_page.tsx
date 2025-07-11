import { Link, useNavigate } from 'react-router-dom';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../css/shadcn/components/ui/table';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '../css/shadcn/components/ui/breadcrumb';
import { Badge } from '../css/shadcn/components/ui/badge';

const orders = [
	{ id: 'ORD-1001', date: '2025-07-10', total: 230.5, status: 'Delivered' },
	{ id: 'ORD-1002', date: '2025-07-09', total: 85.99, status: 'Processing' },
	{ id: 'ORD-1003', date: '2025-07-08', total: 49.0, status: 'Cancelled' },
];

export default function OrderHistoryPage() {
	const navigate = useNavigate();

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'Delivered':
				return <Badge variant='success'>Delivered</Badge>;
			case 'Processing':
				return <Badge variant='secondary'>Processing</Badge>;
			case 'Cancelled':
				return <Badge variant='destructive'>Cancelled</Badge>;
			default:
				return <Badge>{status}</Badge>;
		}
	};

	return (
		<div className='flex flex-col'>
			<Breadcrumb className='text-sm text-muted-foreground'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to='/profile'>Profile</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className='text-foreground'>
							Order History
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h2 className='mt-3 text-xl font-semibold mb-4'>Order History</h2>

			<div className='rounded-md border shadow-sm overflow-hidden'>
				<Table className='text-sm'>
					<TableHeader className='bg-muted'>
						<TableRow>
							<TableHead className='text-muted-foreground'>Order ID</TableHead>
							<TableHead className='text-muted-foreground'>Date</TableHead>
							<TableHead className='text-muted-foreground'>Total</TableHead>
							<TableHead className='text-muted-foreground'>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map((order) => (
							<TableRow
								key={order.id}
								onClick={() =>
									navigate(`/profile/order-history/${order.id}`)
								}
								className='cursor-pointer hover:bg-accent border-t transition-colors'>
								<TableCell className='font-medium'>{order.id}</TableCell>
								<TableCell>{order.date}</TableCell>
								<TableCell>${order.total.toFixed(2)}</TableCell>
								<TableCell>{getStatusBadge(order.status)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
