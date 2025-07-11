import { useNavigate } from 'react-router-dom';
import { Button } from '../css/shadcn/components/ui/button';

export default function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<div className='w-full min-h-screen flex flex-col gap-5 items-center justify-center'>
			<p className='text-3xl font-thin text-black'>404 | Not Found</p>
			<Button onClick={() => navigate('/')}>Go Home</Button>
		</div>
	);
}
