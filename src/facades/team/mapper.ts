import {
	TeamInsertModel,
	TeamDetailModel,
	TeamListModel
} from '@/services/team/schema';
import { TeamDetailDto, TeamListDto, TeamUpdateCreateDto } from './schema';
import { userMapper } from '../user/mapper';

export const teamMapper = {
	mapTeamDetailModelToDto(model: TeamDetailModel): TeamDetailDto {
		return {
			id: model.id,
			name: model.name,
			desc: model.desc ?? undefined,
			imageUrl: model.imageUrl ?? undefined,
			organizerId: model.organizerId,
			organizer: userMapper.mapUserListModelToDto(model.organizer),
			members: model.members.map(userMapper.mapUserListModelToDto)
		};
	},

	mapTeamListModelToDto(model: TeamListModel): TeamListDto {
		return {
			id: model.id,
			name: model.name,
			desc: model.desc ?? undefined,
			imageUrl: model.imageUrl ?? undefined,
			organizerId: model.organizerId
		};
	},

	mapDtoToTeamListModel(dto: TeamListDto): TeamListModel {
		return {
			id: dto.id,
			name: dto.name,
			desc: dto.desc ?? null,
			imageUrl: dto.imageUrl ?? null,
			organizerId: dto.organizerId
		};
	},

	mapDtoToTeamInsertModel(dto: TeamUpdateCreateDto): TeamInsertModel {
		return {
			name: dto.name,
			desc: dto.desc ?? null,
			imageUrl: dto.imageUrl ?? null,
			organizerId: dto.organizerId ?? null
		};
	}
};
