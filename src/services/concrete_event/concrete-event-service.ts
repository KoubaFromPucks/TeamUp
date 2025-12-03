import { concreteEventRepository } from '@/repositories/concrete_event/concrete-event-repository';
import {
	ConcreteEventDetailModel,
	ConcreteEventInsertModel,
	ConcreteEventListModel
} from './schema';
import { concreteEventMapper } from './mapper';
import { eventInvitationService } from '../event_invitation/event-invitation-service';

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
		return concreteEvents.map(concreteEventMapper.mapEntityToListModel);
	},

	async updateConcreteEventById(
		concreteEventId: string,
		concreteEvent: Partial<ConcreteEventInsertModel>
	): Promise<ConcreteEventListModel> {
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
		const deleted =
			await concreteEventRepository.deleteConcreteEventById(concreteEventId);
		if (!deleted) {
			throw new Error('Concrete event delete failed');
		}

		return concreteEventMapper.mapEntityToListModel(deleted);
	}
};
