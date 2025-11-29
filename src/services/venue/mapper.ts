import type { VenueInsertModel, VenueListModel } from './schema';
import type {
	VenueInsertEntity,
	VenueSelectEntity
} from '@/repositories/venue/schema';

export const mapEntityToSelectModel = (
	entity: VenueSelectEntity
): VenueListModel => ({
	id: entity.id,
	name: entity.name,
	address: entity.address,
	gps: entity.gps ?? null,
	description: entity.description ?? null,
	pricePerHour: entity.pricePerHour ?? 0
});

export const mapSelectModelToEntity = (
	model: VenueListModel
): VenueSelectEntity => ({
	id: model.id,
	name: model.name,
	address: model.address,
	gps: model.gps,
	description: model.description,
	pricePerHour: model.pricePerHour
});

export const mapInsertModelToEntity = (
	model: VenueInsertModel
): VenueInsertEntity => ({
	name: model.name,
	address: model.address,
	gps: model.gps,
	description: model.description,
	pricePerHour: model.pricePerHour
});

export const mapEntityToInsertModel = (
	entity: VenueInsertEntity
): VenueInsertModel => ({
	name: entity.name,
	address: entity.address,
	gps: entity.gps ?? null,
	description: entity.description ?? null,
	pricePerHour: entity.pricePerHour ?? 0
});
