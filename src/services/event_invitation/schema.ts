import { InviteState } from '@/db/schema/enums/inviteState';
import { UserListModel } from '../user/schema';
import { ConcreteEventListModel } from '../concrete_event/schema';

export type EventInvitationDetailModel = {
	id: string;
	state: InviteState;
	concreteEventId: string;
	userId: string;
	user: UserListModel | undefined;
	concreteEvent: ConcreteEventListModel | undefined;
};

export type EventInvitationListModel = EventInvitationDetailModel;

export type EventInvitationInsertModel = Omit<
	EventInvitationDetailModel,
	'id' | 'user' | 'concreteEvent'
>;
