import { db } from '@/db';
import {
	EventInvitationInsertEntity,
	EventInvitationSelectEntity,
	EventInvitationUpdateEntity
} from './schema';
import { eventInvitationTable } from '@/db/schema/event-invitation';
import { eq } from 'drizzle-orm';

export const eventInvitationRepository = {
	async createEventInvitation(
		eventInvitationEntity: EventInvitationInsertEntity
	) {
		const createdEventInvitation = await db
			.insert(eventInvitationTable)
			.values(eventInvitationEntity)
			.returning();
		return createdEventInvitation[0] as EventInvitationSelectEntity;
	},

	async getEventInvitationById(eventInvitationId: string) {
		const eventInvitation = await db
			.select()
			.from(eventInvitationTable)
			.where(eq(eventInvitationTable.id, eventInvitationId))
			.limit(1);
		return eventInvitation[0] as EventInvitationSelectEntity | undefined;
	},

	async getAllEventInvitations() {
		const eventInvitations = await db.select().from(eventInvitationTable);
		return eventInvitations as EventInvitationSelectEntity[];
	},

	async getEventInvitationsByConcreteEventId(concreteEventId: string) {
		const eventInvitations = await db
			.select()
			.from(eventInvitationTable)
			.where(eq(eventInvitationTable.concreteEventId, concreteEventId));
		return eventInvitations as EventInvitationSelectEntity[];
	},

	async getEventInvitationsByUserId(userId: string) {
		const eventInvitations = await db
			.select()
			.from(eventInvitationTable)
			.where(eq(eventInvitationTable.userId, userId));
		return eventInvitations as EventInvitationSelectEntity[];
	},

	async updateEventInvitationById(
		eventInvitationId: string,
		eventInvitationEntity: EventInvitationUpdateEntity
	) {
		const updatedEventInvitation = await db
			.update(eventInvitationTable)
			.set(eventInvitationEntity)
			.where(eq(eventInvitationTable.id, eventInvitationId))
			.returning();
		return updatedEventInvitation[0] as EventInvitationSelectEntity | undefined;
	},

	async deleteEventInvitation(eventInvitationId: string) {
		const deleted = await db
			.delete(eventInvitationTable)
			.where(eq(eventInvitationTable.id, eventInvitationId))
			.returning();
		return deleted[0] as EventInvitationSelectEntity | undefined;
	}
};
