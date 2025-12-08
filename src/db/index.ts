import { db } from './client';
import { eventTable } from './schema/event';
import { eventCoorganiserTable } from './schema/event-coorganisers';
import { teamTable } from './schema/team';
import { teamMemberTable } from './schema/team-member';
import { user as userTable } from './schema/better-auth';
import { venueTable } from './schema/venue';
import { concreteEventTable } from './schema/concrete-event';

export {
	db,
	userTable,
	teamTable,
	teamMemberTable,
	venueTable,
	eventTable,
	concreteEventTable,
	eventCoorganiserTable
};
