import { UserDetailModel, UserInsertModel, UserListModel } from './schema';
import {
	UserInsertEntity,
	UserSelectEntity,
	UserWithTeamsEntity
} from '@/repositories/user/schema';
import { teamMapper } from '../team/mapper';

export const userMapper = {
	mapEntityToListModel(entity: UserSelectEntity): UserListModel {
		return {
			id: entity.id,
			name: entity.name,
			surname: entity.surname,
			nickname: entity.nickname,
			email: entity.email,
			phoneNumber: entity.phoneNumber,
			imageUrl: entity.imageUrl
		};
	},

	mapListModelToEntity(model: UserListModel): UserSelectEntity {
		return {
			id: model.id,
			name: model.name,
			surname: model.surname,
			nickname: model.nickname,
			email: model.email,
			phoneNumber: model.phoneNumber,
			imageUrl: model.imageUrl
		};
	},

	mapInsertModelToEntity(model: Omit<UserInsertModel, 'id'>): UserInsertEntity {
		return {
			name: model.name,
			surname: model.surname,
			nickname: model.nickname,
			email: model.email,
			phoneNumber: model.phoneNumber,
			imageUrl: model.imageUrl
		};
	},

	mapEntityToInsertModel(entity: UserInsertEntity): UserInsertModel {
		return {
			name: entity.name,
			surname: entity.surname,
			nickname: entity.nickname,
			email: entity.email,
			phoneNumber: entity.phoneNumber ?? null,
			imageUrl: entity.imageUrl ?? null
		};
	},

	mapEntityWithTeamsToDetailModel(
		entity: UserWithTeamsEntity
	): UserDetailModel {
		return {
			id: entity.id,
			name: entity.name,
			surname: entity.surname,
			nickname: entity.nickname,
			email: entity.email,
			phoneNumber: entity.phoneNumber,
			imageUrl: entity.imageUrl,
			adminedTeams: entity.adminedTeams.map(team =>
				teamMapper.mapEntityToListModel(team)
			),
			memberTeams: entity.memberTeams.map(team =>
				teamMapper.mapEntityToListModel(team)
			)
		};
	}
};
