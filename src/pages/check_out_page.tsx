import { Button } from '../css/shadcn/components/ui/button';
import { ChevronLeft, IdCard, Minus, Plus, ScanText } from 'lucide-react';
import { Badge } from '../css/shadcn/components/ui/badge';
import useCartStore from '../stores/cart_store';
import { useNavigate } from 'react-router-dom';
import { useDeviceType } from '../utils/device_type';
import NavBar from '../components/nav_bar';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../css/shadcn/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../css/shadcn//components/ui/select';
import { Input } from '../css/shadcn/components/ui/input';
import { Checkbox } from '../css/shadcn/components/ui/checkbox';
import { supportedCountries } from '../utils/supported_countries';

const FormSchema = z.object({
	email: z.string().email('Invalid Email').min(1, {
		message: 'Email is required',
	}),
	username: z.string().min(1, {
		message: 'Username is required',
	}),
	country: z.string().min(1, {
		message: 'Country is required',
	}),
	address: z.string().min(1, {
		message: 'Address is required',
	}),
	card_number: z
		.string()
		.min(19, { message: 'Card number must be 16 digits (formatted)' })
		.regex(/^(\d{4}[\s]?){4}$/, { message: 'Invalid card number format' })
		.transform((val) => val.replace(/\s+/g, '')),

	expiry_date: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
		message: 'Expiry must be in MM/YY format',
	}),

	cvc: z
		.string()
		.min(3, { message: 'CVC must be 3 digits' })
		.max(4, { message: 'CVC must be 4 digits max' })
		.regex(/^\d+$/, { message: 'CVC must be numeric' }),

	isBillingAddressSameAsShipping: z.boolean({
		message: 'Please specify if billing address is same',
	}),
});

export default function CheckOutPage() {
	const navigate = useNavigate();
	const { cartItems, increaseQuantity, decreaseQuantity, totalItems, totalPrice, checkout } =
		useCartStore();

	const deviceType = useDeviceType();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast('You submitted the following values', {
			description: (
				<pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
					<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	function formatCardNumber(value: string) {
		const digits = value.replace(/\D/g, '').slice(0, 16); // limit to 16 digits
		return digits.replace(/(.{4})/g, '$1 ').trim(); // format with spaces
	}

	function formatExpiryDate(value: string) {
		const digits = value.replace(/\D/g, '').slice(0, 4); // max 4 digits
		if (digits.length <= 2) return digits;
		return digits.slice(0, 2) + '/' + digits.slice(2, 4); // MM/YY
	}

	function formatCVCNumber(value: string) {
		return value.replace(/\D/g, '').slice(0, 4);
	}

	return (
		<div className='min-h-screen'>
			<NavBar />
			<div className='mt-[75px] flex flex-row pb-50 flex-wrap justify-center items-start'>
				<div className='w-full lg:w-1/3 p-5'>
					<div className='flex justify-between items-center gap-5'>
						<p className='text-xl font-semibold'>Check Out Items</p>
						<Button
							variant='outline'
							className='rouned-full'
							onClick={() => navigate('/products')}>
							<ChevronLeft />
							<span className='md:inline hidden'>Back To Store</span>
						</Button>
					</div>
					<div className='w-full mt-3 flex flex-col gap-3 '>
						{cartItems.length === 0 && <p className='text-red-500'>No Item</p>}
						{cartItems.map((cartItem) => (
							<div className='bg-card py-3 px-3 shadow-sm border  rounded-lg '>
								<div className='flex gap-5 overscroll-x-auto'>
									<img
										src={cartItem.image}
										alt={cartItem.title}
										className='w-10 rounded-md border border-slate-300 object-contain'
									/>
									<div className='w-full'>
										<div className='flex justify-between items-center'>
											<p
												className='w-2/3 line-clamp-1 cursor-pointer'
												onClick={() =>
													navigate(
														`/products/${cartItem.id}`
													)
												}>
												{cartItem.title}
											</p>
											<p className='font-bold '>
												{cartItem.quantity * cartItem.price} $
											</p>
										</div>
										<div className='mt-3 flex justify-between items-center'>
											<Badge className='bg-gray-200 text-black'>
												Quantity {cartItem.quantity}
											</Badge>
											<div className='flex flex-row gap-3'>
												<Button
													variant='outline'
													size='icon'
													onClick={() =>
														decreaseQuantity(cartItem.id)
													}>
													<Minus />
												</Button>
												<Button
													variant='outline'
													size='icon'
													onClick={() =>
														increaseQuantity(cartItem.id)
													}>
													<Plus />
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					<table className='w-full mt-5 '>
						<tr>
							<td>Total Item</td>
							<td className='text-end'>
								<strong>{cartItems.length}</strong>
							</td>
						</tr>
						<tr>
							<td>Total Cost</td>
							<td className='text-end'>
								<strong>{totalPrice()} $</strong>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<hr className='my-3'></hr>
							</td>
						</tr>
						<tr>
							<td>Subtotal</td>
							<td className='text-end'>
								<strong>{totalPrice()} $</strong>
							</td>
						</tr>
						<tr>
							<td>Discount</td>
							<td className='text-end'>
								<strong>0 $</strong>
							</td>
						</tr>
						<tr>
							<td>Tax</td>
							<td className='text-end'>
								<strong>0 $</strong>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<hr className='my-3'></hr>
							</td>
						</tr>
						<tr>
							<td>Delivery</td>
							<td className='text-end'>
								<strong>30 $</strong>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<hr className='my-3'></hr>
							</td>
						</tr>
						<tr>
							<td className='text-lg'>
								<strong>Total</strong>
							</td>
							<td className='text-end'>
								<strong>{(totalPrice() + 30).toFixed(2)} $</strong>
							</td>
						</tr>
					</table>
				</div>
				<div className='w-full lg:w-1/3 h-[500px] top-0 md:sticky p-5 pt-20'>
					<p className='text-lg font-semibold mb-5'>Shipping Information</p>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input placeholder='' {...field} />
												<IdCard className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5' />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<p className='mt-5 mb-3 font-semibold'>Shipping Address</p>
							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												type='name'
												placeholder='Name'
												{...field}
												className='rounded-bl-none rounded-br-none'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='country'
								render={({ field }) => (
									<FormItem>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className='w-full rounded-none'>
													<SelectValue placeholder='Country' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{supportedCountries.map((country) => (
													<SelectItem value={country.label}>
														{country.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='address'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className='rounded-tl-none rounded-tr-none'
												placeholder='Address'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<p className='mt-5 mb-3 font-semibold'>Payment Detail</p>
							<FormField
								control={form.control}
								name='card_number'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Card Information</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input
													placeholder='0000 0000 0000 0000'
													className='rounded-bl-none rounded-br-none tracking-widest'
													{...field}
													onChange={(e) =>
														field.onChange(
															formatCardNumber(
																e.target.value
															)
														)
													}
												/>
												<img
													src='/payment_types.png'
													className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-30'
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='grid grid-cols-2'>
								<FormField
									control={form.control}
									name='expiry_date'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder='MM/YY'
													className='rounded-tr-none rounded-tl-none rounded-br-none'
													{...field}
													onChange={(e) =>
														field.onChange(
															formatExpiryDate(
																e.target.value
															)
														)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='cvc'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className='relative'>
													<Input
														className='w-full rounded-tl-none rounded-tr-none rounded-bl-none'
														placeholder='CVC'
														{...field}
														onChange={(e) =>
															field.onChange(
																formatCVCNumber(
																	e.target.value
																)
															)
														}
													/>
													<ScanText className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4' />
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='isBillingAddressSameAsShipping'
								render={({ field }) => {
									return (
										<FormItem className='mt-3 flex flex-row items-center gap-2'>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={(checked) => {
														field.onChange(checked);
													}}
												/>
											</FormControl>
											<FormLabel className='text-sm font-normal'>
												Billing address is same as shipping
											</FormLabel>
										</FormItem>
									);
								}}
							/>

							<Button
								disabled={cartItems.length === 0}
								type='submit'
								className='mt-5 w-full'
								onClick={() => {
									checkout();
									navigate('/products');
								}}>
								Pay {(totalPrice() + 30).toFixed(2)} $
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
