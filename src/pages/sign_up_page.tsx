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

const signupSchema = z
	.object({
		name: z.string().min(2, 'Username must be at least 2 characters'),
		email: z.string().email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().min(6),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type SignUpFormInputs = z.infer<typeof signupSchema>;

export default function SignUpPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { login } = useAuthStore();
	const navigate = useNavigate();

	const signupForm = useForm<SignUpFormInputs>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	function onSignUpSubmit(data: SignUpFormInputs) {
		toast('Successfully Signed Up');
		login({
			email: data.email,
			name: data.name,
		});
		navigate('/products');
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-background text-foreground px-4'>
			<div className='max-w-md border w-full rounded-lg shadow-lg p-8 space-y-6 bg-card text-card-foreground'>
				<h2 className='text-3xl font-extrabold text-center'>Create a new account</h2>

				<Form {...signupForm}>
					<form
						onSubmit={signupForm.handleSubmit(onSignUpSubmit)}
						className='space-y-5'>
						<FormField
							control={signupForm.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder='Your username' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={signupForm.control}
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
							control={signupForm.control}
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
												placeholder='Create a password'
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
							control={signupForm.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem className='relative'>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												type={
													showConfirmPassword
														? 'text'
														: 'password'
												}
												placeholder='Confirm your password'
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
							Sign Up
						</Button>
					</form>
				</Form>

				<p className='text-center text-sm text-muted-foreground'>
					Already have an account?{' '}
					<button
						type='button'
						className='font-semibold text-primary hover:underline'
						onClick={() => navigate('/login')}>
						Login
					</button>
				</p>
			</div>
		</div>
	);
}
