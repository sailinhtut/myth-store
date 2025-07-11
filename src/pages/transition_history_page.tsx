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
import { Link } from 'react-router-dom';

const transitionData = [
	{
		id: 'ORD-1001',
		date: '2025-07-10',
		amount: 120.5,
		status: 'Completed',
		method: 'Credit Card',
	},
	{
		id: 'ORD-1002',
		date: '2025-07-09',
		amount: 85.99,
		status: 'Pending',
		method: 'PayPal',
	},
	{
		id: 'ORD-1003',
		date: '2025-07-08',
		amount: 49.0,
		status: 'Failed',
		method: 'Bank Transfer',
	},
];

export default function TransitionHistoryPage() {
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
							Transitions
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h2 className='mt-3 text-xl font-semibold mb-4'>Transaction History</h2>

			<div className='rounded-md border shadow-sm overflow-hidden'>
				<Table className='text-sm'>
					<TableHeader className='bg-muted'>
						<TableRow>
							<TableHead className='text-muted-foreground'>Order ID</TableHead>
							<TableHead className='text-muted-foreground'>Date</TableHead>
							<TableHead className='text-muted-foreground'>Amount</TableHead>
							<TableHead className='text-muted-foreground'>Status</TableHead>
							<TableHead className='text-muted-foreground'>
								Payment Method
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transitionData.map((item) => (
							<TableRow
								key={item.id}
								className='hover:bg-accent transition-colors border-t'>
								<TableCell className='font-medium'>{item.id}</TableCell>
								<TableCell>{item.date}</TableCell>
								<TableCell>${item.amount.toFixed(2)}</TableCell>
								<TableCell>
									<Badge
										variant={
											item.status === 'Completed'
												? 'success'
												: item.status === 'Pending'
												? 'secondary'
												: 'destructive'
										}>
										{item.status}
									</Badge>
								</TableCell>
								<TableCell className='text-sm text-muted-foreground'>
									{item.method}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
