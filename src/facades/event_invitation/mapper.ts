import {
	EventInvitationDetailModel,
	EventInvitationInsertModel,
	EventInvitationListModel
} from '@/services/event_invitation/schema';
import {
	EventInvitationDetailDto,
	EventInvitationListDto,
	EventInvitationUpdateDto
} from './schema';
import { userMapper } from '../user/mapper';
import { ConcreteEventMapper } from '../concrete_event/mapper';

export const eventInvitationMapper = {
	mapEventInvitationDetailModelToDTO(
		model: EventInvitationDetailModel
	): EventInvitationDetailDto {
		return {
			id: model.id,
			concreteEventId: model.id,
			state: model.state,
			userId: model.userId,
			user: model.user
				? userMapper.mapUserListModelToDto(model.user)
				: undefined,
			concreteEvent: model.concreteEvent
				? ConcreteEventMapper.mapConcreteEventListModelToDto(
						model.concreteEvent
					)
				: undefined
		};
	},

	mapEventInvitationListModelToDto(
		model: EventInvitationListModel
	): EventInvitationListDto {
		return {
			id: model.id,
			concreteEventId: model.concreteEventId,
			state: model.state,
			userId: model.userId,
			user: model.user
				? userMapper.mapUserListModelToDto(model.user)
				: undefined,
			concreteEvent: model.concreteEvent
				? ConcreteEventMapper.mapConcreteEventListModelToDto(
						model.concreteEvent
					)
				: undefined
		};
	},

	mapDtoToEventInvitationInsertModel(
		dto: EventInvitationUpdateDto
	): EventInvitationInsertModel {
		return {
			state: dto.state,
			concreteEventId: dto.concreteEventId,
			userId: dto.userId
		};
	}
};
