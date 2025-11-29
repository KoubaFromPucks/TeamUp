import { TeamListModel } from '../team/schema';

export type UserDetailModel = {
	id: string;
	name: string;
	surname: string;
	nickname: string;
	email: string;
	phoneNumber: string | null;
	avatarUrl: string | null;
	adminedTeams: TeamListModel[];
	memberTeams: TeamListModel[];
};

export type UserListModel = Omit<UserDetailModel, 'adminedTeams' | 'memberTeams'>;
export type UserInsertModel = Omit<UserListModel, 'id'>;
