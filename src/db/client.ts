import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { exampleTable } from './schema/example';
import * as relations from './schema/relations';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: { exampleTable, ...relations }
});
