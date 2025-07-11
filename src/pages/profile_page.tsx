'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../css/shadcn/components/ui/form';
import { Input } from '../css/shadcn/components/ui/input';
import { Button } from '../css/shadcn/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth_store';
import { useNavigate } from 'react-router-dom';

const profileSchema = z
	.object({
		name: z.string().min(2, 'Name must be at least 2 characters'),
		email: z.string().email('Invalid email address'),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters')
			.optional()
			.or(z.literal('')),
		confirmPassword: z.string().optional().or(z.literal('')),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type ProfileFormInputs = z.infer<typeof profileSchema>;

export default function ProfilePage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Assume your auth store holds current user info
	const { user } = useAuthStore();
	const navigate = useNavigate();

	const profileForm = useForm<ProfileFormInputs>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user?.name || '',
			email: user?.email || '',
			password: '',
			confirmPassword: '',
		},
	});

	function onSubmit(data: ProfileFormInputs) {
		// Remove password fields if empty, means no password change
		if (!data.password) {
			delete data.password;
			delete data.confirmPassword;
		}

		// updateUser(data);
		toast('Profile updated successfully');
		navigate('/products');
	}

	return (
		<div className='flex flex-col'>
			<h2 className='text-lg font-semibold mb-3'>Profile Setting</h2>

			<Form {...profileForm}>
				<form
					onSubmit={profileForm.handleSubmit(onSubmit)}
					className='w-[300px] flex flex-col gap-5'>
					<FormField
						control={profileForm.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder='Your name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={profileForm.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='you@example.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={profileForm.control}
						name='password'
						render={({ field }) => (
							<FormItem className='relative'>
								<FormLabel>New Password (optional)</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type={showPassword ? 'text' : 'password'}
											placeholder='New password'
											autoComplete='new-password'
											{...field}
										/>
										<button
											type='button'
											className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
											onClick={() =>
												setShowPassword(!showPassword)
											}
											tabIndex={-1}>
											{showPassword ? (
												<EyeOff size={20} />
											) : (
												<Eye size={20} />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={profileForm.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem className='relative'>
								<FormLabel>Confirm New Password</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type={
												showConfirmPassword
													? 'text'
													: 'password'
											}
											placeholder='Confirm new password'
											autoComplete='new-password'
											{...field}
										/>
										<button
											type='button'
											className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword
												)
											}
											tabIndex={-1}>
											{showConfirmPassword ? (
												<EyeOff size={20} />
											) : (
												<Eye size={20} />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='w-full'>
						Update Profile
					</Button>
				</form>
			</Form>
		</div>
	);
}
