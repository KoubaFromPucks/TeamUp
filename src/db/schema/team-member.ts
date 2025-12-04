import { user as userTable } from './better-auth';
import { teamTable } from './team';
import { text } from 'drizzle-orm/sqlite-core/columns/text';
import { sqliteTable } from 'drizzle-orm/sqlite-core/table';
import { primaryKey } from 'drizzle-orm/sqlite-core';

export const teamMemberTable = sqliteTable(
	'team_members',
	{
		userId: text('user_id')
			.notNull()
			.references(() => userTable.id),
		teamId: text('team_id')
			.notNull()
			.references(() => teamTable.id, { onDelete: 'cascade' })
	},
	table => [primaryKey({ columns: [table.userId, table.teamId] })]
);
