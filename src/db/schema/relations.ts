import { relations } from 'drizzle-orm';
import { venueTable } from './venue';
import { eventTable } from './event';
import { userTable } from './user';
import { teamTable } from './team';
import { teamMemberTable } from './team-member';
import { eventCoorganiserTable } from './event-coorganisers';

export const userRelations = relations(userTable, ({ many }) => ({
	ownedTeams: many(teamTable),
	teamMembers: many(teamMemberTable),
	organizedEvents: many(eventTable),
  	coorganizedEvents: many(eventCoorganiserTable)
}));

export const venueRelations = relations(venueTable, ({ many }) => ({
	events: many(eventTable)
}));

export const eventRelations = relations(eventTable, ({ one, many }) => ({
	venue: one(venueTable, {
		fields: [eventTable.venueId],
		references: [venueTable.id]
	}),
	organiser: one(userTable, {
		fields: [eventTable.organisatorId],
		references: [userTable.id]
	}),
	coorganisers: many(eventCoorganiserTable)
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

export const eventCoorganiserRelations = relations(eventCoorganiserTable, ({ one }) => ({
    event: one(eventTable, {
      fields: [eventCoorganiserTable.eventId],
      references: [eventTable.id],
    }),
    user: one(userTable, {
      fields: [eventCoorganiserTable.userId],
      references: [userTable.id],
    }),
  })
);