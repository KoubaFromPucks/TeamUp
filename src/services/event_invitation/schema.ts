import { InviteState } from '@/db/schema/enums/inviteState';
import { UserListModel } from '../user/schema';

export type EventInvitationDetailModel = {
	id: string;
	state: InviteState;
	concreteEventId: string;
	userId: string;
	user: UserListModel | undefined;
};

export type EventInvitationListModel = EventInvitationDetailModel;

export type EventInvitationInsertModel = Omit<
	EventInvitationDetailModel,
	'id' | 'user'
>;
