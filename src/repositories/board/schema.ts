import { boardItemTable } from '@/db/schema/board-item';

export type BoardItemSelectEntity = typeof boardItemTable.$inferSelect;
export type BoardItemInsertEntity = Omit<
	typeof boardItemTable.$inferInsert,
	'id' | 'createdAt'
>;
export type BoardItemUpdateEntity = Partial<
	Omit<BoardItemInsertEntity, 'eventId' | 'authorId'>
>;
