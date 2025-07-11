import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './css/globals.css';
import router from './router.tsx';
import { appPrimaryColor } from './utils/constants.tsx';

document.documentElement.style.setProperty('--primary', appPrimaryColor);

createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router}></RouterProvider>
);
