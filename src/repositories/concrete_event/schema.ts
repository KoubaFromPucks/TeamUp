import { concreteEventTable } from '@/db/schema/concrete-event';
import { EventInvitationSelectEntity } from '../event_invitation/schema';

export type ConcreteEventSelectEntity = typeof concreteEventTable.$inferSelect;
export type ConcreteEventInsertEntity = Omit<
	typeof concreteEventTable.$inferSelect,
	'id'
>;
export type ConcreteEventUpdateEntity = Partial<ConcreteEventInsertEntity>;

export type ConcreteEventDetailEntiy = ConcreteEventSelectEntity & {
	invitations: EventInvitationSelectEntity[];
};
