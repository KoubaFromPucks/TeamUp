import { userMapper } from '../user/mapper';
import type {
	EventInsertModel,
	EventListModel,
	EventWithCoorganisersModel
} from './schema';
import type {
	EventInsertEntity,
	EventSelectEntity,
	EventWithCoorganisersEntity
} from '@/repositories/event/schema';

export const mapEntityToSelectModel = (
	entity: EventSelectEntity
): EventListModel => ({
	id: entity.id,
	venueId: entity.venueId,
	organisatorId: entity.organisatorId,

	name: entity.name,
	startTime: entity.startTime,
	endTime: entity.endTime,

	dayOfWeek: entity.dayOfWeek,
	inviteType: entity.inviteType,
	pricingType: entity.pricingType,

	totalPrice: entity.totalPrice ?? 0
});

export const mapSelectModelToEntity = (
	model: EventListModel
): EventSelectEntity => ({
	id: model.id,
	venueId: model.venueId,
	organisatorId: model.organisatorId,

	name: model.name,
	startTime: model.startTime,
	endTime: model.endTime,

	dayOfWeek: model.dayOfWeek,
	inviteType: model.inviteType,
	pricingType: model.pricingType,

	totalPrice: model.totalPrice
});

export const mapInsertModelToEntity = (
	model: EventInsertModel
): EventInsertEntity => ({
	venueId: model.venueId,
	organisatorId: model.organisatorId,

	name: model.name,
	startTime: model.startTime,
	endTime: model.endTime,

	dayOfWeek: model.dayOfWeek,
	inviteType: model.inviteType,
	pricingType: model.pricingType,

	totalPrice: model.totalPrice
});

export const mapEntityToInsertModel = (
	entity: EventInsertEntity
): EventInsertModel => ({
	venueId: entity.venueId,
	organisatorId: entity.organisatorId,

	name: entity.name,
	startTime: entity.startTime,
	endTime: entity.endTime,

	dayOfWeek: entity.dayOfWeek,
	inviteType: entity.inviteType,
	pricingType: entity.pricingType,

	totalPrice: entity.totalPrice ?? 0
});

export const mapEntityWithCoorganisersToSelectModel = (
	entity: EventWithCoorganisersEntity
): EventWithCoorganisersModel => ({
	...mapEntityToSelectModel(entity),
	coorganisers: entity.coorganisers.map(userMapper.mapEntityToListModel)
});
