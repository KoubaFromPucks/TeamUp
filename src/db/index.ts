import { db } from './client';
import { eventTable } from './schema/event';
import { eventCoorganiserTable } from './schema/event-coorganisers';
import { teamTable } from './schema/team';
import { teamMemberTable } from './schema/team-member';
import { userTable } from './schema/user';
import { venueTable } from './schema/venue';

export {
	db,
	userTable,
	teamTable,
	teamMemberTable,
	venueTable,
	eventTable,
	eventCoorganiserTable
};
