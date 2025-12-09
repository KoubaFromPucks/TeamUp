import {
	UserDetailModel,
	UserEventHistoryModel,
	UserInsertModel,
	UserListModel
} from './schema';
import {
	UserEventHistoryDataEntity,
	UserInsertEntity,
	UserSelectEntity,
	UserWithTeamsEntity
} from '@/repositories/user/schema';
import { teamMapper } from '../team/mapper';
import { concreteEventMapper } from '../concrete_event/mapper';
import { EventInvitationMapper } from '../event_invitation/mapper';
import * as eventMapper from '../event/mapper';

export const userMapper = {
	mapEntityToListModel(entity: UserSelectEntity): UserListModel {
		return {
			id: entity.id,
			name: entity.name,
			nickname: entity.nickname,
			email: entity.email,
			phoneNumber: entity.phoneNumber,
			imageUrl: entity.image
		};
	},

	mapInsertModelToEntity(model: Omit<UserInsertModel, 'id'>): UserInsertEntity {
		return {
			name: model.name,
			nickname: model.nickname,
			email: model.email,
			phoneNumber: model.phoneNumber,
			image: model.imageUrl
		};
	},

	mapEntityWithTeamsToDetailModel(
		entity: UserWithTeamsEntity
	): UserDetailModel {
		return {
			id: entity.id,
			name: entity.name,
			nickname: entity.nickname,
			email: entity.email,
			phoneNumber: entity.phoneNumber,
			imageUrl: entity.image,
			adminedTeams: entity.adminedTeams.map(team =>
				teamMapper.mapEntityToListModel(team)
			),
			memberTeams: entity.memberTeams.map(team =>
				teamMapper.mapEntityToListModel(team)
			)
		};
	},

	mapPartialInsertModelToEntity(
		model: Partial<UserInsertModel>
	): Partial<UserInsertEntity> {
		const entity: Partial<UserInsertEntity> = {};
		if (model.name !== undefined) entity.name = model.name;
		if (model.nickname !== undefined) entity.nickname = model.nickname;
		if (model.email !== undefined) entity.email = model.email;
		if (model.phoneNumber !== undefined) entity.phoneNumber = model.phoneNumber;
		if (model.imageUrl !== undefined) entity.image = model.imageUrl;

		return entity;
	},

	mapEntityToHistoryModel(
		entity: UserEventHistoryDataEntity
	): UserEventHistoryModel {
		return {
			concreteEvent: concreteEventMapper.mapEntityToListModel(
				entity.concreteEvent
			),
			eventInvitation: EventInvitationMapper.mapEntityToListModel(
				entity.eventInvitation
			),
			event: eventMapper.mapEntityToSelectModel(entity.event)
		};
	}
};
