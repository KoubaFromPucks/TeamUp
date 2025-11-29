import { eventTable } from '@/db/schema/event';

export type EventSelectEntity = typeof eventTable.$inferSelect;
export type EventInsertEntity = Omit<typeof eventTable.$inferInsert, 'Id'>;
