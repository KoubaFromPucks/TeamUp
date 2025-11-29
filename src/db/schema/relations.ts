import { relations } from 'drizzle-orm';
import { venueTable } from './venue';
import { eventTable } from './event';
import { userTable } from './user';
import { teamTable } from './team';
import { teamMemberTable } from './team-member';

export const userRelations = relations(userTable, ({ many }) => ({
	ownedTeams: many(teamTable),
	teamMembers: many(teamMemberTable)
}));

export const venueRelations = relations(venueTable, ({ many }) => ({
	events: many(eventTable)
}));

export const eventRelations = relations(eventTable, ({ one }) => ({
	venue: one(venueTable, {
		fields: [eventTable.VenueId],
		references: [venueTable.Id]
	}),
	organiser: one(userTable, {
		fields: [eventTable.OrganisatorId],
		references: [userTable.id]
	})
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
