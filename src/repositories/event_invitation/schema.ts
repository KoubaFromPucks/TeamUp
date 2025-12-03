import { eventInvitationTable } from '@/db/schema/event-invitation';

export type EventInvitationSelectEntity =
	typeof eventInvitationTable.$inferSelect;
export type EventInvitationInsertEntity = Omit<
	typeof eventInvitationTable.$inferSelect,
	'id'
>;
export type EventInvitationUpdateEntity = Partial<EventInvitationInsertEntity>;
