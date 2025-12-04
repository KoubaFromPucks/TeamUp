import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { teamTable } from './schema/team';
import { teamMemberTable } from './schema/team-member';
import { venueTable } from './schema/venue';
import { eventTable } from './schema/event';
import { concreteEventTable } from './schema/concrete-event';
import { eventInvitationTable } from './schema/event-invitation';
import * as relations from './schema/relations';
import { eventCoorganiserTable } from './schema/event-coorganisers';
import { user, session, account, verification } from './schema/better-auth';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		teamTable,
		teamMemberTable,
		venueTable,
		eventTable,
		eventCoorganiserTable,
		user,
		session,
		account,
		verification,
		concreteEventTable,
		eventInvitationTable,
	}
});
