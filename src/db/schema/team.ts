import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user as userTable } from './better-auth';

export const teamTable = sqliteTable('teams', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	desc: text('desc'),
	imageUrl: text('image_url'),
	organizerId: text('organizer_id')
		.notNull()
		.references(() => userTable.id)
});
