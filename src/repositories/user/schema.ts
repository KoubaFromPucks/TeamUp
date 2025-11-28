import { userTable } from '@/db/schema/user';

export type UserSelectEntity = typeof userTable.$inferSelect;
export type UserInsertEntity = Omit<typeof userTable.$inferInsert, 'id'>;
