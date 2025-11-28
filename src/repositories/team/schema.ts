import { teamTable } from '@/db/schema/team';

export type TeamSelectEntity = typeof teamTable.$inferSelect;
export type TeamInsertEntity = Omit<typeof teamTable.$inferInsert, 'id'>;
