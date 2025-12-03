import { eventInvitationRepository } from '@/repositories/event_invitation/event-invitataion-repository';
import {
	EventInvitationDetailModel,
	EventInvitationInsertModel,
	EventInvitationListModel
} from './schema';
import { EventInvitationMapper } from './mapper';
import { userRepository } from '@/repositories/user/user-repository';
import { userMapper } from '../user/mapper';

export const eventInvitationService = {
	async doesEventInvitationExist(id: string): Promise<boolean> {
		if (await eventInvitationRepository.getEventInvitationById(id)) {
			return true;
		}
		return false;
	},

	async createEventInvitation(
		eventInvitation: EventInvitationInsertModel
	): Promise<EventInvitationListModel> {
		const insertEntity =
			EventInvitationMapper.mapInsertModelToCreateEntity(eventInvitation);
		const createdEventInvitation =
			await eventInvitationRepository.createEventInvitation(insertEntity);
		return EventInvitationMapper.mapEntityToListModel(createdEventInvitation);
	},

	async getEventInvitationById(
		eventInvitationId: string
	): Promise<EventInvitationDetailModel> {
		const eventInvitation =
			await eventInvitationRepository.getEventInvitationById(eventInvitationId);

		if (!eventInvitation) {
			throw Error('Event invitation was not found');
		}
		const eventInvitationDetail =
			EventInvitationMapper.mapEntityToDetailModel(eventInvitation);

		const userEntity = await userRepository.getUserById(
			eventInvitationDetail.userId
		);
		if (userEntity) {
			eventInvitationDetail.user = userMapper.mapEntityToListModel(userEntity);
		}

		return eventInvitationDetail;
	},

	async getEventInvitationsByConcreteEventId(
		concreteEventId: string
	): Promise<EventInvitationListModel[]> {
		const eventInvitations =
			await eventInvitationRepository.getEventInvitationsByConcreteEventId(
				concreteEventId
			);
		return eventInvitations.map(EventInvitationMapper.mapEntityToListModel);
	},

	async getEventInvitationsByUserId(
		userId: string
	): Promise<EventInvitationListModel[]> {
		const eventInvitations =
			await eventInvitationRepository.getEventInvitationsByUserId(userId);
		return eventInvitations.map(EventInvitationMapper.mapEntityToListModel);
	},

	async getAllEventInvitations(): Promise<EventInvitationListModel[]> {
		const eventInvitations =
			await eventInvitationRepository.getAllEventInvitations();
		return eventInvitations.map(EventInvitationMapper.mapEntityToListModel);
	},

	async updateEventInvitation(
		eventInvitationId: string,
		eventInvitation: Partial<EventInvitationInsertModel>
	): Promise<EventInvitationListModel> {
		if (!(await this.doesEventInvitationExist(eventInvitationId))) {
			throw new Error('Event invitation does not exist');
		}

		const updateEntity =
			EventInvitationMapper.mapInsertModelToUpdateEntity(eventInvitation);

		const updatedEventInvitation =
			await eventInvitationRepository.updateEventInvitationById(
				eventInvitationId,
				updateEntity
			);
		if (!updatedEventInvitation) {
			throw new Error('Event Invitation update failed');
		}

		return EventInvitationMapper.mapEntityToListModel(updatedEventInvitation);
	},

	async deleteEventInvitation(
		eventInvitationId: string
	): Promise<EventInvitationListModel> {
		const deleted =
			await eventInvitationRepository.deleteEventInvitation(eventInvitationId);
		if (!deleted) {
			throw new Error('Event invitation delete failed');
		}

		return EventInvitationMapper.mapEntityToListModel(deleted);
	}
};
