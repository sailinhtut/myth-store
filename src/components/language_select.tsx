import { Earth } from 'lucide-react';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '../css/shadcn/components/ui/select'; // adjust path if needed
import { useState } from 'react';

export function LanguageSelect() {
	const [language, setLangugage] = useState('english');

	return (
		<Select value={language} onValueChange={(value) => setLangugage(value)}>
			<SelectTrigger
				className='w-10 overflow-hidden md:border md:shadow-sm shadow-none'
				size='sm'>
				<SelectValue className='bg-card' asChild>
					<Earth />
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='english'>English</SelectItem>
				<SelectItem value='myanmar'>Myanmar</SelectItem>
			</SelectContent>
		</Select>
	);
}
