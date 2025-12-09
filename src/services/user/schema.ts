import { TeamListModel } from '../team/schema';
import { EventListModel } from '../event/schema';
import { ConcreteEventListModel } from '../concrete_event/schema';
import { EventInvitationListModel } from '../event_invitation/schema';

export type UserDetailModel = {
	id: string;
	name: string;
	nickname: string;
	email: string;
	phoneNumber: string | null;
	imageUrl: string | null;
	adminedTeams: TeamListModel[];
	memberTeams: TeamListModel[];
};

export type UserListModel = Omit<
	UserDetailModel,
	'adminedTeams' | 'memberTeams'
>;

export type UserInsertModel = Omit<UserListModel, 'id'>;

export type UserEventHistoryModel = {
	concreteEvent: ConcreteEventListModel;
	eventInvitation: EventInvitationListModel;
	event: EventListModel;
};
