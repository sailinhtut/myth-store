import { Toaster } from 'sonner';
import useProductStore from './stores/product_store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { appPrimaryColor } from './utils/constants';
import CartTray from './components/cart_tray';
import { useThemeStore } from './stores/theme_store';
import { useAuthStore } from './stores/auth_store';
import { ScrollResetForRouting } from './components/scroll_reset';

function App() {
	const { fetchProducts } = useProductStore();
	const { applyTheme } = useThemeStore();
	const { loadAuthCredential } = useAuthStore();

	useEffect(function () {
		fetchProducts();
		applyTheme();
		loadAuthCredential();
	}, []);

	return (
		<div>
			<ScrollResetForRouting/>
			<Outlet />
			<Toaster position='top-right' />
			<CartTray />
		</div>
	);
}

export default App;
