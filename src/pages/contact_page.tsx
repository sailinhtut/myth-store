'use client';

import React, { useState } from 'react';
import NavBar from '../components/nav_bar';
import { Button } from '../css/shadcn/components/ui/button';
import { appName } from '../utils/constants';

export default function ContactPage() {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<div>
			<div className='min-h-screen bg-gradient-to-br from-amber-100 via-purple-100 to-pink-100 flex flex-col'>
				<NavBar />
				<section className=' mt-[75px] mx-auto px-6 py-20 text-center'>
					<h1 className='text-5xl md:text-6xl font-extrabold mb-4 text-gray-900'>
						Get in Touch With Us
					</h1>
					<p className='text-lg md:text-xl text-gray-700  mx-auto mb-12'>
						Have questions or want to collaborate? Fill out the form below and
						we’ll get back to you as soon as possible.
					</p>
				</section>

				{/* Contact Form Section */}
				<section className='lg:max-w-3xl md:w-full bg-white rounded-xl shadow-lg mx-5 md:mx-auto px-8 py-10 mb-24'>
					{submitted ? (
						<div className='text-center text-green-600 text-xl font-semibold'>
							Thanks for reaching out! We will respond shortly.
						</div>
					) : (
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div>
								<label
									htmlFor='name'
									className='block text-gray-700 font-medium mb-2'>
									Name
								</label>
								<input
									id='name'
									name='name'
									type='text'
									required
									value={form.name}
									onChange={handleChange}
									className='w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500'
									placeholder='Your full name'
								/>
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-gray-700 font-medium mb-2'>
									Email
								</label>
								<input
									id='email'
									name='email'
									type='email'
									required
									value={form.email}
									onChange={handleChange}
									className='w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500'
									placeholder='you@example.com'
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='block text-gray-700 font-medium mb-2'>
									Message
								</label>
								<textarea
									id='message'
									name='message'
									rows={5}
									required
									value={form.message}
									onChange={handleChange}
									className='w-full rounded-md border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500'
									placeholder='Write your message here...'
								/>
							</div>

							<Button
								type='submit'
								className='w-full py-5 font-semibold rounded-md'>
								Send Message
							</Button>
						</form>
					)}
				</section>
			</div>
			<footer className='bg-black text-white text-center py-6'>
				<p>
					&copy; {new Date().getFullYear()} {appName}. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
