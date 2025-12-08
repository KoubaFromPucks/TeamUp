import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const authService = {
	async getLoggedUserOrThrow(errorMessage: string = 'User is not logged in') {
		const session = await auth.api.getSession({ headers: await headers() });

		if (!session?.user) {
			throw new Error(errorMessage);
		}

		return session.user;
	},

	async getLoggedUserOrNull() {
		try {
			return await this.getLoggedUserOrThrow();
		} catch {
			return null;
		}
	},

	async throwIfUserNotLoggedIn(errorMessage: string = 'User is not logged in') {
		await this.getLoggedUserOrThrow(errorMessage);
	}
};
