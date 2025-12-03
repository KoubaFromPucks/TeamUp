import {
	EventInvitationInsertEntity,
	EventInvitationSelectEntity,
	EventInvitationUpdateEntity
} from '@/repositories/event_invitation/schema';
import {
	EventInvitationDetailModel,
	EventInvitationInsertModel,
	EventInvitationListModel
} from './schema';

export const EventInvitationMapper = {
	mapEntityToListModel(
		entity: EventInvitationSelectEntity
	): EventInvitationListModel {
		return {
			id: entity.id,
			concreteEventId: entity.concreteEventId,
			state: entity.state,
			userId: entity.userId,
			user: undefined
		};
	},

	mapInsertModelToCreateEntity(
		model: EventInvitationInsertModel
	): EventInvitationInsertEntity {
		return {
			concreteEventId: model.concreteEventId,
			state: model.state,
			userId: model.userId
		};
	},

	mapEntityToDetailModel(
		entity: EventInvitationSelectEntity
	): EventInvitationDetailModel {
		return {
			concreteEventId: entity.concreteEventId,
			id: entity.id,
			state: entity.state,
			userId: entity.userId,
			user: undefined
		};
	},

	mapInsertModelToUpdateEntity(
		model: Partial<EventInvitationInsertModel>
	): EventInvitationUpdateEntity {
		return {
			concreteEventId: model.concreteEventId,
			state: model.state,
			userId: model.userId
		};
	}
};
