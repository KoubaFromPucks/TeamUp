import { sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
import { user as userTable } from './better-auth';
import { eventTable } from './event';

export const eventCoorganiserTable = sqliteTable(
	'event_coorganisers',
	{
		eventId: text('event_id')
			.notNull()
			.references(() => eventTable.id, { onDelete: 'cascade' }),

		userId: text('user_id')
			.notNull()
			.references(() => userTable.id, { onDelete: 'cascade' })
	},
	t => ({
		pk: primaryKey({ columns: [t.eventId, t.userId] })
	})
);
