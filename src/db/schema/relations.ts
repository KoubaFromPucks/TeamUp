import { relations } from 'drizzle-orm';
import { userTable } from './user';
import { teamTable } from './team';
import { teamMemberTable } from './team-member';

export const userRelations = relations(userTable, ({ many }) => ({
	ownedTeams: many(teamTable),
	teamMembers: many(teamMemberTable)
}));

export const teamRelations = relations(teamTable, ({ many, one }) => ({
	organizer: one(userTable, {
		fields: [teamTable.organizerId],
		references: [userTable.id]
	}),
	teamMembers: many(teamMemberTable)
}));

export const teamMemberRelations = relations(teamMemberTable, ({ one }) => ({
	user: one(userTable, {
		fields: [teamMemberTable.userId],
		references: [userTable.id]
	}),
	team: one(teamTable, {
		fields: [teamMemberTable.teamId],
		references: [teamTable.id]
	})
}));
