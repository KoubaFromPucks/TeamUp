import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/client';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	}),
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		}
	},
	advanced: {
		database: {
			generateId: () => crypto.randomUUID()
		}
	},
	user: {
		additionalFields: {
			nickname: {
				type: 'string',
				required: true,
				default: 'MY_NICKNAME'
			},
			phone_number: {
				type: 'string',
				required: false
			}
		}
	}
});
