import {
	BoardItemDetailModel,
	BoardItemInsertModel,
	BoardItemListModel,
	BoardItemUpdateModel
} from '@/services/board/schema';
import {
	BoardItemDetailDto,
	BoardItemListDto,
	BoardItemCreateUpdateDto,
	BoardItemUpdateOnlyDto
} from './schema';

function mapDetailModelToDto(model: BoardItemDetailModel): BoardItemDetailDto {
	return {
		id: model.id,
		eventId: model.eventId,
		authorId: model.authorId,
		title: model.title,
		content: model.content,
		isPinned: model.isPinned,
		createdAt: model.createdAt,
		updatedAt: model.updatedAt,
		authorName: model.authorName,
		eventName: model.eventName,
		eventOrganizerId: model.eventOrganizerId
	};
}

function mapListModelToDto(model: BoardItemListModel): BoardItemListDto {
	return mapDetailModelToDto(model);
}

function mapCreateUpdateDtoToInsertModel(
	dto: BoardItemCreateUpdateDto
): BoardItemInsertModel {
	return {
		eventId: dto.eventId,
		authorId: dto.authorId,
		title: dto.title,
		content: dto.content,
		isPinned: dto.isPinned
	};
}

function mapUpdateOnlyDtoToUpdateModel(
	dto: BoardItemUpdateOnlyDto
): BoardItemUpdateModel {
	return {
		title: dto.title,
		content: dto.content,
		isPinned: dto.isPinned
	};
}

export const boardItemFacadeMapper = {
	mapDetailModelToDto,
	mapListModelToDto,
	mapCreateUpdateDtoToInsertModel,
	mapUpdateOnlyDtoToUpdateModel
};
