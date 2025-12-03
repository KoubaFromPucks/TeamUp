import { db } from '@/db';
import {
	ConcreteEventInsertEntity,
	ConcreteEventSelectEntity,
	ConcreteEventUpdateEntity
} from './schema';
import { concreteEventTable } from '@/db/schema/concrete-event';
import { eq } from 'drizzle-orm';

export const concreteEventRepository = {
	async createConcreteEvent(concreteEventEntity: ConcreteEventInsertEntity) {
		const createdConcreteEvent = await db
			.insert(concreteEventTable)
			.values(concreteEventEntity)
			.returning();
		return createdConcreteEvent[0] as ConcreteEventSelectEntity;
	},

	async getConcreteEventById(concreteEventId: string) {
		const concreteEvent = await db
			.select()
			.from(concreteEventTable)
			.where(eq(concreteEventTable.id, concreteEventId))
			.limit(1);
		return concreteEvent[0] as ConcreteEventSelectEntity | undefined;
	},

	async getAllConcreteEvents() {
		const concreteEvents = await db.select().from(concreteEventTable);
		return concreteEvents as ConcreteEventSelectEntity[];
	},

	async getConcreteEventsByEventId(eventId: string) {
		const concreteEvents = await db
			.select()
			.from(concreteEventTable)
			.where(eq(concreteEventTable.eventId, eventId));
		return concreteEvents as ConcreteEventSelectEntity[];
	},

	async updateConcreteEventById(
		concreteEventId: string,
		concreteEventEntity: ConcreteEventUpdateEntity
	) {
		const updatedConcreteEvent = await db
			.update(concreteEventTable)
			.set(concreteEventEntity)
			.where(eq(concreteEventTable.id, concreteEventId))
			.returning();
		return updatedConcreteEvent[0] as ConcreteEventSelectEntity | undefined;
	},

	async deleteConcreteEventById(concreteEventId: string) {
		const deleted = await db
			.delete(concreteEventTable)
			.where(eq(concreteEventTable.id, concreteEventId))
			.returning();
		return deleted[0] as ConcreteEventSelectEntity | undefined;
	}
};
