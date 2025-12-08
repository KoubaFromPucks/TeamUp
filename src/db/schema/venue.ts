import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import { user as userTable } from './better-auth';

export const venueTable = sqliteTable('venues', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	address: text('address').notNull(),
	gps: text('gps'),
	description: text('description'),
	pricePerHour: real('price_per_hour').notNull().default(0),
	owner: text('owner_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'restrict' })
});
