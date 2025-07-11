import { Moon, Sun, SunMoon } from 'lucide-react';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '../css/shadcn/components/ui/select'; // adjust path if needed
import { useThemeStore } from '../stores/theme_store';

export function ThemeSelect() {
	const { theme, setTheme } = useThemeStore();

	return (
		<Select value={theme} onValueChange={(value) => setTheme(value as any)}>
			<SelectTrigger
				className='w-10 overflow-hidden md:border md:shadow-sm shadow-none'
				size='sm'>
				<SelectValue className='bg-card ' asChild>
					{theme === 'light' ? <Sun /> : theme === 'dark' ? <Moon /> : <SunMoon />}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='light'>
					<Sun /> Light
				</SelectItem>
				<SelectItem value='dark'>
					<Moon /> Dark
				</SelectItem>
				<SelectItem value='system'>
					<SunMoon /> System
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
