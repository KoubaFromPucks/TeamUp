import { eventRepository } from '@/repositories/event/repository';
import type {
	EventInsertModel,
	EventListModel,
	EventWithCoorganisersModel
} from './schema';
import {
	mapEntityToSelectModel,
	mapEntityWithCoorganisersToSelectModel,
	mapInsertModelToEntity
} from './mapper';
import { authService } from '../auth/auth-service';
import { concreteEventService } from '../concrete_event/concrete-event-service';

export const eventService = {
	async createEvent(model: EventInsertModel): Promise<EventListModel> {
		await authService.throwIfUserNotLoggedIn(
			'You must be logged in to create an event.'
		);

		const entity = mapInsertModelToEntity(model);
		const created = await eventRepository.createEvent(entity);
		return mapEntityToSelectModel(created);
	},

	async getEventById(id: string): Promise<EventListModel | undefined> {
		const event = await eventRepository.getEventById(id);
		return event ? mapEntityToSelectModel(event) : undefined;
	},

	async getAllEvents(): Promise<EventListModel[]> {
		const events = await eventRepository.getAllEvents();
		return events.map(mapEntityToSelectModel);
	},

	async updateEventById(
		id: string,
		patch: Partial<EventInsertModel>
	): Promise<EventListModel | undefined> {
		await authService.throwIfUserNotLoggedIn(
			'You must be logged in to update an event.'
		);

		const updated = await eventRepository.updateEventById(id, patch);
		return updated ? mapEntityToSelectModel(updated) : undefined;
	},

	async deleteEventById(id: string): Promise<EventListModel | undefined> {
		await authService.throwIfUserNotLoggedIn(
			'You must be logged in to delete an event.'
		);

		const deleted = await eventRepository.deleteEventById(id);
		return deleted ? mapEntityToSelectModel(deleted) : undefined;
	},

	async getPriceForPayLaterOptionSelectedForEachConcreteEvent(
		eventId: string
	): Promise<number | null> {
		const eventEntity = await eventRepository.getEventById(eventId);
		const loggedUser = await authService.getLoggedUserOrNull();

		if (!eventEntity) {
			throw new Error('Event Does not exist.');
		}

		if (!loggedUser) {
			return null;
		}

		const concreteEvents =
			await concreteEventService.getConcreteEventDetailsByEventId(eventId);

		if (!concreteEvents || concreteEvents.length === 0) {
			return 0;
		}

		const myAcceptedInvitationCount = concreteEvents.flatMap(ce =>
			ce.invitedUsers.filter(
				invitation =>
					invitation.userId === loggedUser.id && invitation.state === 'Accepted'
			)
		).length;

		const totalAcceptedInvitationCount = concreteEvents.flatMap(ce =>
			ce.invitedUsers.filter(invitation => invitation.state === 'Accepted')
		).length;

		const myPrice =
			totalAcceptedInvitationCount > 0
				? (eventEntity.totalPrice / totalAcceptedInvitationCount) *
					myAcceptedInvitationCount
				: 0;

		return myPrice;
	async getEventWithCoorganisersById(
		id: string
	): Promise<EventWithCoorganisersModel | undefined> {
		const event = await eventRepository.getEventWithCoorganisersById(id);
		return event ? mapEntityWithCoorganisersToSelectModel(event) : undefined;
	},

	async getCoorganisersByEventId(eventId: string) {
		return eventRepository.getCoorganisersByEventId(eventId);
	},

	async isUserCoorganiser(eventId: string, userId: string) {
		return eventRepository.isUserCoorganiser(eventId, userId);
	},

	async addCoorganiser(eventId: string, userId: string) {
		await authService.throwIfUserNotLoggedIn(
			'You must be logged in to add coorganiser.'
		);

		await eventRepository.addCoorganiser(eventId, userId);
	},

	async removeCoorganiser(eventId: string, userId: string) {
		await authService.throwIfUserNotLoggedIn(
			'You must be logged in to remove coorganiser.'
		);

		await eventRepository.removeCoorganiser(eventId, userId);
	}
};
