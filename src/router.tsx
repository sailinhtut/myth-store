import { createBrowserRouter } from 'react-router-dom';
import App from './app';
import NotFoundPage from './pages/not_found_page';
import ProductListPage from './pages/product_list_page';
import ProductDetailPage from './pages/product_detail_page';
import LandingPage from './pages/landing_page';
import ContactPage from './pages/contact_page';
import CartPage from './pages/cart_page';
import CheckOutPage from './pages/check_out_page';
import SignUpPage from './pages/sign_up_page';
import LoginPage from './pages/log_in_page';
import ProfilePage from './pages/profile_page';
import ProfileSettingPage from './pages/profile_setting_page';
import OrderHistoryDetailPage from './pages/order_history_detail_page';
import OrderHistoryPage from './pages/order_history_page';
import NotificationPage from './pages/notification_page';
import TransitionHistoryPage from './pages/transition_history_page';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: '/products',
				element: <ProductListPage />,
			},
			{
				path: '/products/:product_id',
				element: <ProductDetailPage />,
			},
			{
				path: '/contact',
				element: <ContactPage />,
			},
			{
				path: '/cart',
				element: <CartPage />,
			},
			{
				path: '/check-out',
				element: <CheckOutPage />,
			},
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/register',
				element: <SignUpPage />,
			},
			{
				path: '/profile',
				element: <ProfileSettingPage />,
				children: [
					{
						index: true,
						element: <ProfilePage />,
					},
					{
						path: '/profile/notifications',
						element: <NotificationPage />,
					},
					{
						path: '/profile/order-history',
						element: <OrderHistoryPage />,
					},
					{
						path: '/profile/order-history/:order_id',
						element: <OrderHistoryDetailPage />,
					},
					{
						path: '/profile/transition-history',
						element: <TransitionHistoryPage />,
					},
				],
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);

export default router;
