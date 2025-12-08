import { user as userTable } from '@/db/schema/better-auth';
import { TeamSelectEntity } from '../team/schema';
import { EventInvitationSelectEntity } from '../event_invitation/schema';
import { EventSelectEntity } from '../event/schema';
import { ConcreteEventSelectEntity } from '../concrete_event/schema';

export type UserSelectEntity = typeof userTable.$inferSelect;
export type UserInsertEntity = Omit<typeof userTable.$inferInsert, 'id'>;

export type UserWithTeamsEntity = UserSelectEntity & {
	adminedTeams: TeamSelectEntity[];
	memberTeams: TeamSelectEntity[];
};

export type UserEventHistoryDataEntity = {
	concreteEvent: ConcreteEventSelectEntity;
	event: EventSelectEntity;
	eventInvitation: EventInvitationSelectEntity;
};
