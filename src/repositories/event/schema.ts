import { eventTable } from '@/db/schema/event';
import { UserSelectEntity } from '../user/schema';

export type EventSelectEntity = typeof eventTable.$inferSelect;
export type EventInsertEntity = Omit<typeof eventTable.$inferInsert, 'id'>;

export type EventWithCoorganisersEntity = EventSelectEntity & {
    coorganisers: UserSelectEntity[];
};