'use client';

import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { appName } from '../utils/constants';
import useProductStore from '../stores/product_store';
import type { Product } from '../stores/product_store';
import { Button } from '../css/shadcn/components/ui/button';
import useCartStore from '../stores/cart_store';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { Badge } from '../css/shadcn/components/ui/badge';
import { useDeviceType } from '../utils/device_type';
import { ThemeSelect } from './theme_select';
import { LanguageSelect } from './language_select';
import { useAuthStore } from '../stores/auth_store';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '../css/shadcn/components/ui/dropdown-menu';

export default function NavBar() {
	const [query, setQuery] = useState('');
	const { products } = useProductStore();
	const deviceType = useDeviceType();
	const { cartItems, showCartTray, setShowCartTray } = useCartStore();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [showMenu, setShowMenu] = useState(false);
	const [searchedProducts, setSearchProducts] = useState<Product[]>([]);

	const { login, logout, isLoggedIn } = useAuthStore();

	const menu = [
		{
			path: '/products',
			name: 'Store',
		},
		{
			path: '/contact',
			name: 'Contact',
		},
	];

	// useEffect(() => {}, [query]);

	const handleSearch = (value: string) => {
		if (value.trim().length <= 0) {
			setSearchProducts([]);
			return;
		}
		const matchedProducts = products.filter((product) =>
			product.title.trim().toLocaleLowerCase().includes(value.trim().toLocaleLowerCase())
		);
		console.log('Before ' + matchedProducts.length);
		setSearchProducts(matchedProducts);
		console.log('After ' + searchedProducts.length);
	};

	return (
		<nav className='bg-background text-foreground shadow px-3 md:px-4 py-3 fixed top-0 left-0 right-0 z-50  transition-all duration-300 dark:border-b dark:border-white/10'>
			<div className='flex items-center justify-between'>
				<div className='text-base md:text-xl font-semibold flex gap-3 items-center'>
					<img src='/favicon.svg' className='size-10 hidden md:block' />
					<Link to='/'>{appName}</Link>
				</div>

				<div className='flex gap-1 md:gap-3 items-center'>
					{pathname !== '/check-out' && (
						<Button
							variant='ghost'
							size='icon'
							className={`relative  ${
								cartItems.length > 0 ? 'scale-100' : 'scale-0'
							} transition-all duration-400`}
							onClick={() => setShowCartTray(!showCartTray)}>
							<ShoppingCart className='text-primary size-5' />
							<Badge
								variant='secondary'
								className='px-2 bg-transparent absolute -top-2 -left-2 group-hover:bg-primary group-hover:border-primary/70'>
								{cartItems.length}+
							</Badge>
						</Button>
					)}
					{deviceType === 'mobile' && (
						<Button
							variant='ghost'
							size='icon'
							className=''
							onClick={() => setShowMenu(!showMenu)}>
							<Menu className='text-primary size-5' />
						</Button>
					)}

					<div className='hidden md:flex items-center space-x-6 text-gray-700 font-medium'>
						{!isLoggedIn && (
							<NavLink
								to='/login'
								className={({ isActive }) =>
									isActive
										? 'text-primary font-semibold transition'
										: 'text-gray-500 hover:text-secondary-foreground transition'
								}>
								Log In
							</NavLink>
						)}
						{menu.map((route) => (
							<NavLink
								to={route.path}
								className={({ isActive }) =>
									isActive
										? 'text-primary font-semibold transition'
										: 'text-gray-500 hover:text-secondary-foreground transition'
								}>
								{route.name}
							</NavLink>
						))}

						<div className='relative'>
							<input
								type='text'
								placeholder='Search...'
								value={query}
								onChange={(e) => {
									setQuery(e.target.value);
									handleSearch(e.target.value);
								}}
								className='bg-card text-foreground px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black'
							/>
							<div
								className={`mt-3 max-w-screen overflow-x-hidden absolute right-0  bg-background border  rounded-md shadow flex flex-col overflow-y-auto origin-top transition-all duration-500 ${
									searchedProducts.length > 0
										? 'max-h-[300px] scale-y-100 opacity-100'
										: 'h-0 scale-y-0  opacity-0'
								}`}>
								{searchedProducts.map((item) => (
									<div
										className='w-full px-3 py-5 h-[50px] flex items-center hover:bg-primary/10 hover:text-primary text-popover-foreground whitespace-nowrap cursor-pointer text-sm '
										onClick={() => navigate(`/products/${item.id}`)}>
										{item.title}
									</div>
								))}
							</div>
						</div>
					</div>

					<ThemeSelect />

					{isLoggedIn && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant={'outline'} size={'icon'}>
									<User />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuGroup>
									<DropdownMenuItem asChild>
										<Link to='/profile'>Profile</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										className='text-destructive'
										onClick={() => {
											logout();
										}}>
										Log Out
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
					{/* <LanguageSelect /> */}
				</div>
			</div>
			{deviceType === 'mobile' && (
				<div
					className={`w-full transition-all duration-300 flex flex-col ${
						showMenu ? 'block' : 'hidden'
					}`}>
					{!isLoggedIn && (
						<NavLink
							to='/login'
							className={({ isActive }) =>
								isActive
									? 'text-primary font-semibold transition'
									: 'text-gray-500 hover:text-secondary-foreground transition'
							}>
							<div className='w-full py-2 px-1'>Log In</div>
						</NavLink>
					)}
					{menu.map((route) => (
						<NavLink
							to={route.path}
							className={({ isActive }) =>
								isActive
									? 'text-primary font-semibold transition'
									: 'text-gray-500 hover:text-secondary-foreground transition'
							}>
							<div className='w-full py-2 px-1'>{route.name}</div>
						</NavLink>
					))}
					<div className='relative'>
						<input
							type='text'
							placeholder='Search...'
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								handleSearch(e.target.value);
							}}
							className='w-full text-foreground px-3 py-1 border bg-card  rounded-md focus:outline-none focus:ring-2 focus:ring-black'
						/>
						<div
							className={`mt-3 max-w-4/5 overflow-x-auto absolute right-0  bg-background border rounded-md shadow flex flex-col overflow-y-auto origin-top transition-all duration-500 ${
								searchedProducts.length > 0
									? 'max-h-[300px] scale-y-100 opacity-100'
									: 'h-0 scale-y-0  opacity-0'
							}`}>
							{searchedProducts.map((item) => (
								<div
									className='w-full px-3 py-5 h-[50px] flex items-center hover:bg-primary/10 hover:text-primary whitespace-nowrap cursor-pointer text-sm'
									onClick={() => navigate(`/products/${item.id}`)}>
									{item.title}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
