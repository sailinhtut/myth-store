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

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuthStore();
	const navigate = useNavigate();

	const loginForm = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	});

	function onLoginSubmit(data: LoginFormInputs) {
		toast('Successfully Logged');
		login({
			email: data.email,
			name: 'Unknown User',
		});
		navigate('/products');
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-background text-foreground px-4'>
			<div className='max-w-md border w-full rounded-lg shadow-lg p-8 space-y-6 bg-card text-card-foreground'>
				<h2 className='text-3xl font-extrabold text-center'>Login to your account</h2>

				<Form {...loginForm}>
					<form
						onSubmit={loginForm.handleSubmit(onLoginSubmit)}
						className='space-y-5'>
						<FormField
							control={loginForm.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email address</FormLabel>
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
							control={loginForm.control}
							name='password'
							render={({ field }) => (
								<FormItem className='relative'>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												type={
													showPassword ? 'text' : 'password'
												}
												placeholder='Enter your password'
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

						<Button type='submit' className='w-full'>
							Login
						</Button>
					</form>
				</Form>

				<p className='text-center text-sm text-muted-foreground'>
					Don't have an account?{' '}
					<button
						type='button'
						className='font-semibold text-primary hover:underline'
						onClick={() => navigate('/register')}>
						Sign Up
					</button>
				</p>
			</div>
		</div>
	);
}
