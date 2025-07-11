import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	applyTheme: (theme?: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
	theme: (localStorage.getItem('theme') as Theme) || 'system',

	setTheme: (theme) => {
		localStorage.setItem('theme', theme);
		document.documentElement.classList.remove('light', 'dark');

		if (
			theme === 'dark' ||
			(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.add('light');
		}

		set({ theme });
	},

	applyTheme: (storedTheme?: Theme) => {
		const theme = storedTheme || (localStorage.getItem('theme') as Theme) || 'system';
		document.documentElement.classList.remove('light', 'dark');

		if (
			theme === 'dark' ||
			(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.add('light');
		}

		set({ theme });
	},
}));
