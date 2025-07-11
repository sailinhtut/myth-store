'use client';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/nav_bar';
import { useAuthStore } from '../stores/auth_store';

export default function ProfileSettingPage() {
	// Assume your auth store holds current user info
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { logout } = useAuthStore();

	const menuItems = [
		{ label: 'Profile', route: '/profile' },
		{ label: 'Notifications', route: '/profile/notifications' },
		{ label: 'Order History', route: '/profile/order-history' },
		{ label: 'Transitions', route: '/profile/transition-history' },
	];

	return (
		<div>
			<NavBar />
			<div className='flex flex-row'>
				<div className='w-[200px] pt-[75px] h-screen shrink-0 sticky top-0 border-r bg-card p-4 flex flex-col justify-between'>
					<ul className='space-y-2 text-sm'>
						{menuItems.map((item) => (
							<li>
								<Link
									to={item.route}
									className={`block px-2 py-2 rounded   text-foreground ${
										pathname === item.route
											? 'bg-primary hover:bg-primary'
											: 'bg-transparent hover:bg-primary/50'
									} `}>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
					<div
						onClick={() => {
							logout();
							navigate('/');
						}}
						className={`block px-2 py-2 rounded text-destructive text-sm select-none hover:bg-red-300 hover:dark:bg-red-700 cursor-pointer`}>
						Log Out
					</div>
				</div>

				<div className='grow rounded-lg p-8 pt-[75px]'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
