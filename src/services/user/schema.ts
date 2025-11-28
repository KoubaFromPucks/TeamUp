import { TeamListModel } from '../team/schema';

export type UserDetailModel = {
	id: string;
	name: string;
	surname: string;
	nickname: string;
	email: string;
	phoneNumber: string | null;
	avatarUrl: string | null;
	ownedTeams: TeamListModel[];
	memberTeams: TeamListModel[];
};

export type UserListModel = Omit<UserDetailModel, 'ownedTeams' | 'memberTeams'>;

export type UserInsertModel = Omit<UserListModel, 'id'>;
