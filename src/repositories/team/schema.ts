import { teamTable } from '@/db/schema/team';
import { UserSelectEntity } from '../user/schema';

export type TeamSelectEntity = typeof teamTable.$inferSelect;
export type TeamInsertEntity = Omit<typeof teamTable.$inferInsert, 'id'>;
export type TeamWithMembersEntity = TeamSelectEntity & {
	members: UserSelectEntity[];
};