import { concreteEventRepository } from '@/repositories/concrete_event/concrete-event-repository';
import {
	ConcreteEventDetailModel,
	ConcreteEventInsertModel,
	ConcreteEventListModel
} from './schema';
import { concreteEventMapper } from './mapper';
import { eventInvitationService } from '../event_invitation/event-invitation-service';
import { eventRepository } from '@/repositories/event/repository';
import { eventCoorganiserRepository } from '@/repositories/event_coorganiser/event-coorganiser-repository';
import { authService } from '../auth/auth-service';

export const concreteEventService = {
	async doesConcreteEventExist(id: string): Promise<boolean> {
		if (await concreteEventRepository.getConcreteEventById(id)) {
			return true;
		}
		return false;
	},

	async createConcreteEvent(
		concreteEvent: ConcreteEventInsertModel
	): Promise<ConcreteEventListModel> {
		const user = await authService.getLoggedUserOrThrow();
		if (!(await this.isUserEventsOrganizer(concreteEvent.eventId, user.id))) {
			throw new Error('User is not events organiser');
		}
		const createEntity =
			concreteEventMapper.mapInsertModelToInsertEntity(concreteEvent);
		const createdConcreteEvent =
			await concreteEventRepository.createConcreteEvent(createEntity);
		return concreteEventMapper.mapEntityToListModel(createdConcreteEvent);
	},

	async getConcreteEnventById(
		concreteEventId: string
	): Promise<ConcreteEventDetailModel> {
		const concreteEvent =
			await concreteEventRepository.getConcreteEventById(concreteEventId);

		if (!concreteEvent) {
			throw Error('Concrete Event was not found');
		}
		const concreteEventDetail =
			concreteEventMapper.mapEntityToDetailModel(concreteEvent);

		const eventModel = await eventRepository.getEventById(
			concreteEvent.eventId
		);

		concreteEventDetail.eventName = eventModel?.name;

		concreteEventDetail.invitedUsers =
			await eventInvitationService.getEventInvitationsByConcreteEventId(
				concreteEventId
			);

		return concreteEventDetail;
	},

	async getConcreteEventsByEventId(
		eventId: string
	): Promise<ConcreteEventListModel[]> {
		const concreteEvents =
			await concreteEventRepository.getConcreteEventsByEventId(eventId);
		return concreteEvents.map(concreteEventMapper.mapEntityToListModel);
	},

	async getAllConcreteEvents(): Promise<ConcreteEventListModel[]> {
		const concreteEvents = await concreteEventRepository.getAllConcreteEvents();
		const result = await Promise.all(
			concreteEvents.map(async concreteEvent => {
				const eventModel = await eventRepository.getEventById(
					concreteEvent.eventId
				);

				const listModel =
					concreteEventMapper.mapEntityToListModel(concreteEvent);

				return {
					...listModel,
					eventName: eventModel?.name
				};
			})
		);

		return result;
	},

	async getAllConcreteEventsFromCurrentDate(): Promise<
		ConcreteEventListModel[]
	> {
		const concreteEvents =
			await concreteEventRepository.getAllConcreteEventsFromCurrentDate();
		const result = (
			await Promise.all(
				concreteEvents.map(async concreteEvent => {
					const eventModel = await eventRepository.getEventById(
						concreteEvent.eventId
					);

					if (eventModel?.inviteType !== 'public') {
						return null;
					}

					const listModel =
						concreteEventMapper.mapEntityToListModel(concreteEvent);

					return {
						...listModel,
						eventName: eventModel?.name
					};
				})
			)
		).filter((item): item is NonNullable<typeof item> => item !== null);

		return result;
	},

	async updateConcreteEventById(
		concreteEventId: string,
		concreteEvent: Partial<ConcreteEventInsertModel>
	): Promise<ConcreteEventListModel> {
		const concreteEventGet = await this.getConcreteEnventById(concreteEventId);
		const user = await authService.getLoggedUserOrThrow();
		if (
			!(await this.isUserEventsOrganizer(concreteEventGet.eventId, user.id))
		) {
			throw new Error('User is not events organiser');
		}

		if (!(await this.doesConcreteEventExist(concreteEventId))) {
			throw new Error('Concrete event does not exist');
		}

		const updateEntity =
			concreteEventMapper.mapInsertModelToUpdateEntity(concreteEvent);

		const updatedConcreteEvent =
			await concreteEventRepository.updateConcreteEventById(
				concreteEventId,
				updateEntity
			);
		if (!updatedConcreteEvent) {
			throw new Error('Concrete event update failed');
		}

		return concreteEventMapper.mapEntityToListModel(updatedConcreteEvent);
	},

	async deleteConcreteEvent(
		concreteEventId: string
	): Promise<ConcreteEventListModel> {
		const concreteEventGet = await this.getConcreteEnventById(concreteEventId);
		const user = await authService.getLoggedUserOrThrow();
		if (
			!(await this.isUserEventsOrganizer(concreteEventGet.eventId, user.id))
		) {
			throw new Error('User is not events organiser');
		}

		const deleted =
			await concreteEventRepository.deleteConcreteEventById(concreteEventId);
		if (!deleted) {
			throw new Error('Concrete event delete failed');
		}

		return concreteEventMapper.mapEntityToListModel(deleted);
	},

	async isUserEventsOrganizer(
		eventId: string,
		userId: string
	): Promise<boolean> {
		const event = await eventRepository.getEventById(eventId);

		if (!event) {
			throw new Error('Event not found');
		}

		if (event.organisatorId === userId) {
			return true;
		}

		const coorganisers =
			await eventCoorganiserRepository.getEventCoorganisersByEventId(event.id);

		if (coorganisers.some(coorganiser => coorganiser.userId === userId)) {
			return true;
		}

		return false;
	}
};
