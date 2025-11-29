import { UserListModel } from '../user/schema';

export type TeamDetailModel = {
	id: string;
	name: string;
	desc: string | null;
	imageUrl: string | null;
	organizerId: string;
	organizer: UserListModel;
	members: UserListModel[];
};

export type TeamListModel = Omit<TeamDetailModel, 'organizer' | 'members'>;

export type TeamInsertModel = Omit<TeamListModel, 'id'>;
