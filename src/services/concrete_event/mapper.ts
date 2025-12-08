import {
	ConcreteEventInsertEntity,
	ConcreteEventSelectEntity,
	ConcreteEventUpdateEntity
} from '@/repositories/concrete_event/schema';
import {
	ConcreteEventDetailModel,
	ConcreteEventInsertModel,
	ConcreteEventListModel
} from './schema';

export const concreteEventMapper = {
	mapEntityToListModel(
		entity: ConcreteEventSelectEntity
	): ConcreteEventListModel {
		return {
			id: entity.id,
			price: entity.price,
			eventId: entity.eventId,
			startDate: entity.startDate,
			endDate: entity.endDate,
			eventName: undefined
		};
	},

	mapInsertModelToInsertEntity(
		model: ConcreteEventInsertModel
	): ConcreteEventInsertEntity {
		return {
			endDate: model.endDate,
			startDate: model.startDate,
			eventId: model.eventId,
			price: model.price
		};
	},

	mapEntityToDetailModel(
		entity: ConcreteEventSelectEntity
	): ConcreteEventDetailModel {
		return {
			id: entity.id,
			eventId: entity.eventId,
			startDate: entity.startDate,
			endDate: entity.endDate,
			price: entity.price,
			invitedUsers: [],
			eventName: undefined
		};
	},

	mapInsertModelToUpdateEntity(
		model: Partial<ConcreteEventInsertModel>
	): ConcreteEventUpdateEntity {
		return {
			startDate: model.startDate,
			endDate: model.endDate,
			eventId: model.eventId,
			price: model.price
		};
	}
};
