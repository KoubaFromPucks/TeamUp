import {
	UserInsertModel,
	UserDetailModel,
	UserListModel
} from '@/services/user/schema';
import { UserDetailDto, UserListDto, UserUpdateCreateDto } from './schema';
import { teamMapper } from '../team/mapper';

export const userMapper = {
	mapUserDetailModelToDto(model: UserDetailModel): UserDetailDto {
		return {
			id: model.id,
			name: model.name,
			surname: model.surname,
			nickname: model.nickname,
			email: model.email,
			phoneNumber: model.phoneNumber ?? undefined,
			imageUrl: model.imageUrl ?? undefined,
			adminedTeams: model.adminedTeams.map(teamMapper.mapTeamListModelToDto),
			memberTeams: model.memberTeams.map(teamMapper.mapTeamListModelToDto)
		};
	},

	mapUserListModelToDto(model: UserListModel): UserListDto {
		return {
			id: model.id,
			name: model.name,
			surname: model.surname,
			nickname: model.nickname,
			email: model.email,
			phoneNumber: model.phoneNumber ?? undefined,
			imageUrl: model.imageUrl ?? undefined
		};
	},

	mapDtoToUserListModel(dto: UserListDto): UserListModel {
		return {
			id: dto.id,
			name: dto.name,
			surname: dto.surname,
			nickname: dto.nickname,
			email: dto.email,
			phoneNumber: dto.phoneNumber ?? null,
			imageUrl: dto.imageUrl ?? null
		};
	},

	mapDtoToUserInsertModel(dto: UserUpdateCreateDto): UserInsertModel {
		return {
			name: dto.name,
			surname: dto.surname,
			nickname: dto.nickname,
			email: dto.email,
			phoneNumber: dto.phoneNumber ?? null,
			imageUrl: dto.imageUrl ?? null
		};
	}
};
