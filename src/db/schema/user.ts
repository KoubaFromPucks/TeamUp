import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	nickname: text('nickname').notNull(),
	email: text('email').notNull().unique(),
	phoneNumber: text('phone_number'),
	imageUrl: text('image_url')
});

// TODO vazby (co)organizator
// TODO vazby eventInvitation
