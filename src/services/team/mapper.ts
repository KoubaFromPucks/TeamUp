import { TeamListModel, TeamInsertModel } from './schema';
import { TeamSelectEntity, TeamInsertEntity } from '@/repositories/team/schema';

export const teamMapper = {
	mapEntityToListModel(entity: TeamSelectEntity): TeamListModel {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.desc,
			imageUrl: entity.imageUrl,
			organizerId: entity.organizerId
		};
	},

	mapListModelToEntity(model: TeamListModel): TeamSelectEntity {
		{
			return {
				id: model.id,
				name: model.name,
				desc: model.description,
				imageUrl: model.imageUrl,
				organizerId: model.organizerId
			};
		}
	},

	mapInsertModelToEntity(model: TeamInsertModel) {
		return {
			name: model.name,
			desc: model.description,
			imageUrl: model.imageUrl ?? null,
			organizerId: model.organizerId
		};
	},

	mapEntityToInsertModel(entity: TeamInsertEntity): TeamInsertModel {
		return {
			name: entity.name,
			description: entity.desc,
			imageUrl: entity.imageUrl ?? null,
			organizerId: entity.organizerId
		};
	}
};
