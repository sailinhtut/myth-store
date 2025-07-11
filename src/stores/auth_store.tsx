import { create } from 'zustand';

interface User {
	email: string;
	name: string;
}

interface AuthState {
	isLoggedIn: boolean;
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
	loadAuthCredential: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: false,
	user: null,

	login: (user) => {
		localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, user }));
		set({ isLoggedIn: true, user });
	},

	logout: () => {
		localStorage.removeItem('auth');
		set({ isLoggedIn: false, user: null });
	},

	loadAuthCredential: () => {
		const stored = localStorage.getItem('auth');
		if (stored) {
			const parsed = JSON.parse(stored);
			set({ isLoggedIn: parsed.isLoggedIn, user: parsed.user });
		}
	},
}));
