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
import { EventInvitationMapper } from '../event_invitation/mapper';
import { EventInvitationDetailModel } from '../event_invitation/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { eventInvitationRepository } from '@/repositories/event_invitation/event-invitataion-repository';

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
		concreteEventDetail.eventPricingType = eventModel?.pricingType;

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

	async getConcreteEventDetailsByEventId(
		eventId: string
	): Promise<ConcreteEventDetailModel[]> {
		const concreteEvents =
			await concreteEventRepository.getConcreteEventsByEventId(eventId);

		const mappedEntities = concreteEvents.map(
			concreteEventMapper.mapEntityToDetailModel
		);
		return await Promise.all(
			mappedEntities.map(async concreteEventDetail => ({
				...concreteEventDetail,
				invitedUsers: (
					await eventInvitationService.getEventInvitationsByConcreteEventId(
						concreteEventDetail.id
					)
				).map(
					EventInvitationMapper.mapEntityToDetailModel
				) as EventInvitationDetailModel[]
			}))
		);
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
			(await concreteEventRepository.getAllConcreteEventsFromCurrentDate()) ||
			[];

		const result = (
			await Promise.all(
				concreteEvents.map(async concreteEvent => {
					const eventModel = await eventRepository.getEventById(
						concreteEvent.eventId
					);

					if (!eventModel || eventModel.inviteType !== 'public') {
						return null;
					}

					const listModel =
						concreteEventMapper.mapEntityToListModel(concreteEvent);

					return {
						...listModel,
						eventName: eventModel.name
					};
				})
			)
		).filter((item): item is NonNullable<typeof item> => item !== null);

		try {
			const session = await auth.api.getSession({ headers: await headers() });
			const user = session?.user;

			if (user) {
				const eventInvitations =
					(await eventInvitationRepository.getEventInvitationsByUserId(
						user.id
					)) || [];

				for (const e of eventInvitations) {
					const concreteEvent =
						await concreteEventRepository.getConcreteEventById(
							e.concreteEventId
						);

					if (!concreteEvent) continue;

					if (new Date(concreteEvent.startDate) > new Date()) {
						const eventModel = await eventRepository.getEventById(
							concreteEvent.eventId
						);
						if (!eventModel) continue;

						const listModel =
							concreteEventMapper.mapEntityToListModel(concreteEvent);

						result.push({
							...listModel,
							eventName: eventModel.name,
							eventPricingType: eventModel.pricingType
						});
					}
				}
			}
		} catch (err) {
			console.warn('Error fetching user session or invitations', err);
		}

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
