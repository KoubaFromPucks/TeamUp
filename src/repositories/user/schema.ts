import { userTable } from '@/db/schema/user';
import { TeamSelectEntity } from '../team/schema';

export type UserSelectEntity = typeof userTable.$inferSelect;
export type UserInsertEntity = Omit<typeof userTable.$inferInsert, 'id'>;
export type UserWithTeamsEntity = UserSelectEntity & {
    ownedTeams: TeamSelectEntity[],
    memberTeams: TeamSelectEntity[]
};