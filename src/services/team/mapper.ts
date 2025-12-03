import { TeamListModel, TeamInsertModel, TeamDetailModel } from './schema';
import {
	TeamSelectEntity,
	TeamInsertEntity,
	TeamWithMembersEntity
} from '@/repositories/team/schema';
import { userMapper } from '../user/mapper';

export const teamMapper = {
	mapEntityToListModel(entity: TeamSelectEntity): TeamListModel {
		return {
			id: entity.id,
			name: entity.name,
			desc: entity.desc,
			imageUrl: entity.imageUrl,
			organizerId: entity.organizerId
		};
	},

	mapListModelToEntity(model: TeamListModel): TeamSelectEntity {
		{
			return {
				id: model.id,
				name: model.name,
				desc: model.desc,
				imageUrl: model.imageUrl,
				organizerId: model.organizerId
			};
		}
	},

	mapInsertModelToEntity(model: TeamInsertModel) {
		return {
			name: model.name,
			desc: model.desc,
			imageUrl: model.imageUrl ?? null,
			organizerId: model.organizerId
		};
	},

	mapEntityToInsertModel(entity: TeamInsertEntity): TeamInsertModel {
		return {
			name: entity.name,
			desc: entity.desc ?? null,
			imageUrl: entity.imageUrl ?? null,
			organizerId: entity.organizerId
		};
	},

	mapEntityToDetailModel(entity: TeamWithMembersEntity): TeamDetailModel {
		return {
			id: entity.id,
			name: entity.name,
			desc: entity.desc,
			imageUrl: entity.imageUrl,
			organizerId: entity.organizerId,
			members: entity.members
				.filter(member => member !== null)
				.map(userMapper.mapEntityToListModel),
			organizer: userMapper.mapEntityToListModel(entity.organizer)
		};
	}
};
