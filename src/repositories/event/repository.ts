import type {
	EventSelectEntity,
	EventInsertEntity,
	EventWithCoorganisersEntity
} from '@/repositories/event/schema';
import { db, eventCoorganiserTable, eventTable, userTable } from '@/db';
import { and, eq } from 'drizzle-orm';
import { UserSelectEntity } from '../user/schema';

export const eventRepository = {
	async createEvent(eventEntity: EventInsertEntity) {
		const created = await db.insert(eventTable).values(eventEntity).returning();

		return created[0] as EventSelectEntity;
	},

	async getEventById(eventId: string) {
		const event = await db
			.select()
			.from(eventTable)
			.where(eq(eventTable.id, eventId))
			.limit(1);

		return event[0] as EventSelectEntity | undefined;
	},

	async getAllEvents() {
		const events = await db.select().from(eventTable);
		return events as EventSelectEntity[];
	},

	async updateEventById(
		eventId: string,
		eventEntity: Partial<EventInsertEntity>
	) {
		const updated = await db
			.update(eventTable)
			.set(eventEntity)
			.where(eq(eventTable.id, eventId))
			.returning();

		return updated[0] as EventSelectEntity | undefined;
	},

	async deleteEventById(eventId: string) {
		const deleted = await db
			.delete(eventTable)
			.where(eq(eventTable.id, eventId))
			.returning();

		return deleted[0] as EventSelectEntity | undefined;
	},

	async getAllEventsWithRelations() {
		const events = await db.query.eventTable.findMany({
			with: {
				venue: true,
				organiser: true
			}
		});

		return events;
	},

	async getCoorganisersByEventId(eventId: string): Promise<UserSelectEntity[]> {
		const rows = await db
			.select({
				id: userTable.id,
				name: userTable.name,
				email: userTable.email,
				image: userTable.image,
				nickname: userTable.nickname,
				phoneNumber: userTable.phoneNumber
			})
			.from(eventCoorganiserTable)
			.leftJoin(userTable, eq(eventCoorganiserTable.userId, userTable.id))
			.where(eq(eventCoorganiserTable.eventId, eventId));

		return rows.filter(r => r.id != null) as UserSelectEntity[];
	},

	async isUserCoorganiser(eventId: string, userId: string): Promise<boolean> {
		const row = await db
			.select({ userId: eventCoorganiserTable.userId })
			.from(eventCoorganiserTable)
			.where(
				and(
					eq(eventCoorganiserTable.eventId, eventId),
					eq(eventCoorganiserTable.userId, userId)
				)
			)
			.limit(1);

		return row.length > 0;
	},

	async addCoorganiser(eventId: string, userId: string) {
		await db.insert(eventCoorganiserTable).values({ eventId, userId });
	},

	async removeCoorganiser(eventId: string, userId: string) {
		await db
			.delete(eventCoorganiserTable)
			.where(
				and(
					eq(eventCoorganiserTable.eventId, eventId),
					eq(eventCoorganiserTable.userId, userId)
				)
			);
	},

	async getEventWithCoorganisersById(
		eventId: string
	): Promise<EventWithCoorganisersEntity | undefined> {
		const event = await this.getEventById(eventId);
		if (!event) return undefined;

		const coorganisers = await this.getCoorganisersByEventId(eventId);

		return {
			...event,
			coorganisers
		};
	},
};
