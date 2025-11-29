import { eventRepository } from '@/repositories/event/repository';
import type { EventInsertModel, EventListModel } from './schema';
import { mapEntityToSelectModel, mapInsertModelToEntity } from './mapper';

export const eventService = {
	async createEvent(model: EventInsertModel): Promise<EventListModel> {
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
		const updated = await eventRepository.updateEventById(id, patch);
		return updated ? mapEntityToSelectModel(updated) : undefined;
	},

	async deleteEventById(id: string): Promise<EventListModel | undefined> {
		const deleted = await eventRepository.deleteEventById(id);
		return deleted ? mapEntityToSelectModel(deleted) : undefined;
	}
};
