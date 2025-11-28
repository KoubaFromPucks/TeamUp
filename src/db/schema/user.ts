import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	email: text('email').notNull().unique(),
	imageUrl: text('image_url')
});

// TODO vazby (co)organizator
// TODO vazby eventInvitation

export type DrizzleUserSelect = typeof userTable.$inferSelect;
export type DrizzleUserInsert = typeof userTable.$inferInsert;
