import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { userTable } from './user';

export const teamTable = sqliteTable('teams', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	desc: text('desc').notNull(),
	imageUrl: text('image_url'),
	organizerId: text('organizer_id')
		.notNull()
		.references(() => userTable.id)
});

export type DrizzleTeamSelect = typeof teamTable.$inferSelect;
export type DrizzleTeamInsert = typeof teamTable.$inferInsert;
