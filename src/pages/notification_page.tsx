import { Link } from 'react-router-dom';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '../css/shadcn/components/ui/breadcrumb';
import { BellIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

const notifications = [
	{
		id: 1,
		title: 'Order Shipped',
		description: 'Your order #ORD-1001 has been shipped.',
		time: '2 hours ago',
		type: 'success',
	},
	{
		id: 2,
		title: 'Payment Failed',
		description: 'Transaction for order #ORD-1002 failed.',
		time: '5 hours ago',
		type: 'error',
	},
	{
		id: 3,
		title: 'New Promotion',
		description: 'Get 20% off on your next purchase!',
		time: '1 day ago',
		type: 'info',
	},
];

export default function NotificationPage() {
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
							Notifications
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h2 className='mt-3 text-lg font-semibold mb-3'>Notifications</h2>

			<div className='space-y-2'>
				{notifications.map((noti) => (
					<div
						key={noti.id}
						className='flex items-start gap-2 px-3 py-2 border rounded-md shadow-sm hover:bg-accent transition-colors select-none'>
						<div className='pt-[2px]'>
							{noti.type === 'success' && (
								<CheckCircleIcon className='text-green-500 w-4 h-4' />
							)}
							{noti.type === 'error' && (
								<XCircleIcon className='text-red-500 w-4 h-4' />
							)}
							{noti.type === 'info' && (
								<BellIcon className='text-blue-500 w-4 h-4' />
							)}
						</div>

						<div className='flex-1 space-y-0.5'>
							<p className='text-sm font-medium leading-none'>{noti.title}</p>
							<p className='text-xs text-muted-foreground'>
								{noti.description}
							</p>
							<p className='text-[10px] text-gray-400'>{noti.time}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
