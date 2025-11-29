import type { EventInsertModel, EventListModel } from './schema';
import type {
	EventInsertEntity,
	EventSelectEntity
} from '@/repositories/event/schema';

export const mapEntityToSelectModel = (
	entity: EventSelectEntity
): EventListModel => ({
	Id: entity.Id,
	VenueId: entity.VenueId,
	OrganisatorId: entity.OrganisatorId,

	Name: entity.Name,
	StartTime: entity.StartTime,
	EndTime: entity.EndTime,

	DayOfWeek: entity.DayOfWeek,
	InviteType: entity.InviteType,
	PricingType: entity.PricingType,

	TotalPrice: entity.TotalPrice ?? 0
});

export const mapSelectModelToEntity = (
	model: EventListModel
): EventSelectEntity => ({
	Id: model.Id,
	VenueId: model.VenueId,
	OrganisatorId: model.OrganisatorId,

	Name: model.Name,
	StartTime: model.StartTime,
	EndTime: model.EndTime,

	DayOfWeek: model.DayOfWeek,
	InviteType: model.InviteType,
	PricingType: model.PricingType,

	TotalPrice: model.TotalPrice
});

export const mapInsertModelToEntity = (
	model: EventInsertModel
): EventInsertEntity => ({
	VenueId: model.VenueId,
	OrganisatorId: model.OrganisatorId,

	Name: model.Name,
	StartTime: model.StartTime,
	EndTime: model.EndTime,

	DayOfWeek: model.DayOfWeek,
	InviteType: model.InviteType,
	PricingType: model.PricingType,

	TotalPrice: model.TotalPrice
});

export const mapEntityToInsertModel = (
	entity: EventInsertEntity
): EventInsertModel => ({
	VenueId: entity.VenueId,
	OrganisatorId: entity.OrganisatorId,

	Name: entity.Name,
	StartTime: entity.StartTime,
	EndTime: entity.EndTime,

	DayOfWeek: entity.DayOfWeek,
	InviteType: entity.InviteType,
	PricingType: entity.PricingType,

	TotalPrice: entity.TotalPrice ?? 0
});
