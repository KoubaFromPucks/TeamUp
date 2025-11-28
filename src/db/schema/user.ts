import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

/* 
TODO: Delete this if necessary real user entity is created by other member
*/

export const userTable = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
});