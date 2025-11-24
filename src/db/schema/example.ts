import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const exampleTable = sqliteTable('users', {
	id: text('id').primaryKey(),
	name: text('name').notNull()
});

// Typ generovaný Drizzle
export type DrizzleExample = typeof exampleTable.$inferSelect;
