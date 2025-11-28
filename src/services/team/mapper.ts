import { TeamListModel, TeamInsertModel } from './schema';
import { TeamSelectEntity, TeamInsertEntity } from '@/repositories/team/schema';

export const mapEntityToSelectModel = (
	entity: TeamSelectEntity
): TeamListModel => ({
	id: entity.id,
	name: entity.name,
	description: entity.desc,
	imageUrl: entity.imageUrl,
	organizerId: entity.organizerId
});

export const mapSelectModelToEntity = (
	model: TeamListModel
): TeamSelectEntity => ({
	id: model.id,
	name: model.name,
	desc: model.description,
	imageUrl: model.imageUrl,
	organizerId: model.organizerId
});

export const mapInsertModelToEntity = (
	model: TeamInsertModel
): TeamInsertEntity => ({
	name: model.name,
	desc: model.description,
	imageUrl: model.imageUrl ?? null,
	organizerId: model.organizerId
});

export const mapEntityToInsertModel = (
	entity: TeamInsertEntity
): TeamInsertModel => ({
	name: entity.name,
	description: entity.desc,
	imageUrl: entity.imageUrl ?? null,
	organizerId: entity.organizerId
});
