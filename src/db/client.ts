import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as relations from './schema/relations';
import { userTable } from './schema/user';
import { venueTable } from './schema/venue';
import { eventTable } from './schema/event';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: { userTable, venueTable, eventTable, ...relations }
});
