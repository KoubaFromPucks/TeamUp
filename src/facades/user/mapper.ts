import {
	UserInsertModel,
	UserDetailModel,
	UserListModel,
	UserEventHistoryModel
} from '@/services/user/schema';
import {
	UserDetailDto,
	UserEventHistoryDataDto,
	UserListDto,
	UserUpdateCreateDto
} from './schema';
import { teamMapper } from '../team/mapper';
import { ConcreteEventMapper } from '../concrete_event/mapper';
import { eventInvitationMapper } from '../event_invitation/mapper';

export const userMapper = {
	mapUserDetailModelToDto(model: UserDetailModel): UserDetailDto {
		return {
			id: model.id,
			name: model.name,
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
			nickname: dto.nickname,
			email: dto.email,
			phoneNumber: dto.phoneNumber ?? null,
			imageUrl: dto.imageUrl ?? null
		};
	},

	mapDtoToUserInsertModel(dto: UserUpdateCreateDto): UserInsertModel {
		return {
			name: dto.name,
			nickname: dto.nickname,
			email: dto.email,
			phoneNumber: dto.phoneNumber ?? null,
			imageUrl: dto.imageUrl ?? null
		};
	},

	mapUserHistoryDataModelToDto(
		model: UserEventHistoryModel
	): UserEventHistoryDataDto {
		return {
			concreteEvent: ConcreteEventMapper.mapConcreteEventListModelToDto(
				model.concreteEvent
			),
			eventInvitation: eventInvitationMapper.mapEventInvitationListModelToDto(
				model.eventInvitation
			),
			event: {
				id: model.event.id,
				name: model.event.name
			}
		};
	}
};
