import { Link } from 'react-router-dom';
import NavBar from '../components/nav_bar';
import { appName } from '../utils/constants';

const products = [
	{
		name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
		price: '$99',
		image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
	},
	{
		name: 'Mens Casual Premium Slim Fit T-Shirts',
		price: '$22.3',
		image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
	},
	{
		name: 'Mens Cotton Jacket',
		price: '$55.99',
		image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
	},
];

export default function LandingPage() {
	return (
		<div>
			<NavBar />
			<section className='mt-[65px] relative py-44 px-4'>
				{/* Background Image */}
				<img
					src='/landing_hero.jpg'
					alt='Hero Background'
					className='absolute inset-0 w-full h-full object-cover z-0'
				/>

				{/* Overlay (optional for better text contrast) */}
				<div className='absolute inset-0 bg-black/30 z-10' />

				{/* Content on top */}
				<div className='relative z-20 text-center text-white'>
					<h1 className='text-4xl md:text-6xl font-bold mb-4'>
						Elevate Your Everyday Essentials
					</h1>
					<p className='text-lg text-gray-200 mb-6 max-w-xl mx-auto'>
						Discover our curated collection of gadgets and gear, hand-picked to
						boost your daily life.
					</p>
					<Link to='/products'>
						<button className='bg-primary text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition'>
							Shop Now
						</button>
					</Link>
				</div>
			</section>

			{/* Features */}
			<section className='py-12 px-4 grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto'>
				<div>
					<h3 className='text-xl font-semibold mb-2'>Fast Delivery</h3>
					<p className='text-gray-600'>
						Get your products in 2-3 days with express shipping.
					</p>
				</div>
				<div>
					<h3 className='text-xl font-semibold mb-2'>Secure Payments</h3>
					<p className='text-gray-600'>
						Pay safely with encrypted checkout and multiple options.
					</p>
				</div>
				<div>
					<h3 className='text-xl font-semibold mb-2'>24/7 Support</h3>
					<p className='text-gray-600'>
						Chat with our team anytime for help with your order.
					</p>
				</div>
			</section>

			{/* Product Preview */}
			<section className='py-16 px-4 max-w-6xl mx-auto'>
				<h2 className='text-3xl font-bold text-center mb-10'>Featured Products</h2>
				<div className='grid md:grid-cols-3 gap-8'>
					{products.map((p, idx) => (
						<div
							key={idx}
							className='bg-card text-foreground shadow border  rounded-xl overflow-hidden hover:shadow-lg transition py-5'>
							<img
								src={p.image}
								alt={p.name}
								className='w-full h-48 object-contain'
							/>
							<div className='p-4'>
								<h3 className='text-lg font-semibold line-clamp-1'>
									{p.name}
								</h3>
								<p className='text-gray-600'>{p.price}</p>
								<Link to='/products'>
									<button className='bg-primary text-foreground mt-4 px-4 py-2 rounded-full w-full hover:bg-gray-800 transition'>
										Buy Now
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className='py-16 px-4 max-w-6xl mx-auto'>
				<h2 className='text-3xl font-bold text-center mb-10'>Shop by Category</h2>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 '>
					{['Electronics', 'Clothing', 'Accessories', 'Home & Living'].map(
						(category) => (
							<div
								key={category}
								className='bg-card border shadow-sm rounded-xl text-center p-6 hover:shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:bg-primary/20'>
								<p className='text-lg font-semibold'>{category}</p>
							</div>
						)
					)}
				</div>
			</section>

			{/* Testimonials */}
			<section className='bg-background py-16 px-4'>
				<h2 className='text-3xl font-bold text-center mb-10'>What Customers Say</h2>
				<div className='max-w-4xl mx-auto grid md:grid-cols-2 gap-8'>
					<blockquote className='bg-card text-foreground p-6 rounded-xl shadow hover:border-2 hover:bg-primary text-black hover:text-white group'>
						<p className='italic '>
							"Fast shipping and great quality! Will definitely order again."
						</p>
						<footer className='mt-4 text-sm text-gray-500 group-hover:text-white'>
							– Sarah L.
						</footer>
					</blockquote>
					<blockquote className='bg-card text-foreground p-6 rounded-xl shadow hover:border-2 hover:bg-primary  text-black hover:text-white group'>
						<p className='italic '>
							"The earbuds are amazing! Better than big brands I tried."
						</p>
						<footer className='mt-4 text-sm text-gray-500 group-hover:text-white'>
							– Jason M.
						</footer>
					</blockquote>
				</div>
			</section>

			<section className='py-32 px-4 max-w-6xl mx-auto text-center'>
				<h2 className='text-2xl font-semibold mb-6'>Trusted by Leading Brands</h2>
				<div className='flex flex-wrap justify-center gap-10  opacity-70'>
					{/* Apple */}
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
						alt='Apple'
						className='h-8 w-auto'
					/>
					{/* Google */}
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
						alt='Google'
						className='h-8 w-auto'
					/>
					{/* Microsoft */}
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
						alt='Microsoft'
						className='h-8 w-auto'
					/>
					{/* Amazon */}
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
						alt='Amazon'
						className='h-8 w-auto'
					/>
				</div>
			</section>

			<section className=' text-black py-20 px-4 text-center'>
				<h2 className='text-3xl font-bold mb-4 text-primary'>Stay in the Loop</h2>
				<p className='text-md text-muted-foreground mb-6 max-w-xl mx-auto'>
					Get updates on new arrivals, discounts, and member-only offers.
				</p>
				<form className='flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto'>
					<input
						type='email'
						placeholder='Enter your email'
						className='px-4 py-3 rounded-lg w-full sm:w-auto flex-1 border placeholder-gray-400 text-black'
					/>
					<button className='bg-black text-white px-6 py-3 rounded-lg hover:opacity-80 transition'>
						Subscribe
					</button>
				</form>
			</section>

			{/* Footer */}
			<footer className='bg-black text-white text-center py-6'>
				<p>
					&copy; {new Date().getFullYear()} {appName}. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
