import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { userTable } from './schema/user';
import { teamTable } from './schema/team';
import { teamMemberTable } from './schema/team-member';
import * as relations from './schema/relations';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: { userTable, teamTable, teamMemberTable, ...relations }
});
