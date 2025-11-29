import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { userTable } from './schema/user';
import { teamTable } from './schema/team';
import { teamMemberTable } from './schema/team-member';
import { venueTable } from './schema/venue';
import { eventTable } from './schema/event';
import * as relations from './schema/relations';
import { eventCoorganiserTable } from './schema/event-coorganisers';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		userTable,
		teamTable,
		teamMemberTable,
		venueTable,
		eventTable,
		eventCoorganiserTable,
		...relations
	}
});
