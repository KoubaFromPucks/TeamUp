import { relations } from 'drizzle-orm';
import { venueTable } from './venue';
import { eventTable } from './event';
import { user as userTable } from './better-auth';
import { teamTable } from './team';
import { teamMemberTable } from './team-member';
import { eventCoorganiserTable } from './event-coorganisers';
import { eventInvitationTable } from './event-invitation';
import { concreteEventTable } from './concrete-event';
import { boardItemTable } from './board-item';

export const userRelations = relations(userTable, ({ many }) => ({
	ownedTeams: many(teamTable),
	teamMembers: many(teamMemberTable),
	organizedEvents: many(eventTable),
	coorganizedEvents: many(eventCoorganiserTable),
	eventsInvitedOn: many(eventInvitationTable),
	boardItems: many(boardItemTable)
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
	coorganisers: many(eventCoorganiserTable),
	concreteEvents: many(concreteEventTable)
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

export const eventCoorganiserRelations = relations(
	eventCoorganiserTable,
	({ one }) => ({
		event: one(eventTable, {
			fields: [eventCoorganiserTable.eventId],
			references: [eventTable.id]
		}),
		user: one(userTable, {
			fields: [eventCoorganiserTable.userId],
			references: [userTable.id]
		})
	})
);

export const eventInvitationRelations = relations(
	eventInvitationTable,
	({ one }) => ({
		user: one(userTable, {
			fields: [eventInvitationTable.userId],
			references: [userTable.id]
		}),
		concreteEventTable: one(concreteEventTable, {
			fields: [eventInvitationTable.concreteEventId],
			references: [concreteEventTable.id]
		})
	})
);

export const concreteEventRelations = relations(
	concreteEventTable,
	({ one, many }) => ({
		event: one(eventTable, {
			fields: [concreteEventTable.eventId],
			references: [eventTable.id]
		}),
		invitations: many(eventInvitationTable),
		boardItems: many(boardItemTable)
	})
);

export const boardItemRelations = relations(boardItemTable, ({ one }) => ({
	concreteEvent: one(concreteEventTable, {
		fields: [boardItemTable.concreteEventId],
		references: [concreteEventTable.id]
	}),
	author: one(userTable, {
		fields: [boardItemTable.authorId],
		references: [userTable.id]
	})
}));
