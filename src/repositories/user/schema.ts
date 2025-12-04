import { user as userTable } from '@/db/schema/better-auth';
import { TeamSelectEntity } from '../team/schema';

export type UserSelectEntity = typeof userTable.$inferSelect;
export type UserInsertEntity = Omit<typeof userTable.$inferInsert, 'id'>;

export type UserWithTeamsEntity = UserSelectEntity & {
	adminedTeams: TeamSelectEntity[];
	memberTeams: TeamSelectEntity[];
};
