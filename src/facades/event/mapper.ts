// src/facades/event/mapper.ts
import type {
	EventInsertModel,
	EventListModel,
	EventDetailModel
} from '@/services/event/schema';

import type { EventUpdateDto, EventListDto, EventDetailDto } from './schema';

import type { BoardItemListDto } from '../board/schema';
import type { ConcreteEventListDto } from '../concrete_event/schema';
import { ConcreteEventMapper } from '../concrete_event/mapper';
import { boardItemFacadeMapper } from '../board/mapper';

function mapListModelToDto(model: EventListModel): EventListDto {
	return {
		id: model.id,
		name: model.name,
		dayOfWeek: model.dayOfWeek,
		startTime: model.startTime,
		endTime: model.endTime,
		inviteType: model.inviteType,
		venueName: null
	};
}

function mapDetailModelToDto(
	model: EventDetailModel,
	extras?: {
		boardItems?: BoardItemListDto[];
		concreteEvents?: ConcreteEventListDto[];
	}
): EventDetailDto {
	return {
		id: model.id,
		venueId: model.venueId,
		organisatorId: model.organisatorId,

		name: model.name,
		startTime: model.startTime,
		endTime: model.endTime,

		dayOfWeek: model.dayOfWeek,
		inviteType: model.inviteType,
		pricingType: model.pricingType,

		totalPrice: model.totalPrice ?? null,

		boardItems:
			extras?.boardItems?.map(boardItemFacadeMapper.mapListModelToDto) ?? [],
		concreteEvents:
			extras?.concreteEvents?.map(
				ConcreteEventMapper.mapConcreteEventListModelToDto
			) ?? []
	};
}

function mapUpdateDtoToInsertModel(dto: EventUpdateDto): EventInsertModel {
	return {
		venueId: dto.venueId,
		organisatorId: dto.organisatorId,

		name: dto.name,

		startTime: dto.startTime,
		endTime: dto.endTime,

		dayOfWeek: dto.dayOfWeek,
		inviteType: dto.inviteType,
		pricingType: dto.pricingType,

		totalPrice: dto.totalPrice ?? 0
	};
}

export const eventFacadeMapper = {
	mapListModelToDto,
	mapDetailModelToDto,
	mapUpdateDtoToInsertModel
};
