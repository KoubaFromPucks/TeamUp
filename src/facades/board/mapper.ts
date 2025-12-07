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

export const boardItemFacadeMapper = {
	mapDetailModelToDto(model: BoardItemDetailModel): BoardItemDetailDto {
		return {
			id: model.id,
			concreteEventId: model.concreteEventId,
			authorId: model.authorId,
			title: model.title,
			content: model.content,
			isPinned: model.isPinned,
			createdAt: model.createdAt,
			updatedAt: model.updatedAt
		};
	},

	mapListModelToDto(model: BoardItemListModel): BoardItemListDto {
		return this.mapDetailModelToDto(model);
	},

	mapCreateUpdateDtoToInsertModel(
		dto: BoardItemCreateUpdateDto
	): BoardItemInsertModel {
		return {
			concreteEventId: dto.concreteEventId,
			authorId: dto.authorId,
			title: dto.title,
			content: dto.content,
			isPinned: dto.isPinned
		};
	},

	mapUpdateOnlyDtoToUpdateModel(
		dto: BoardItemUpdateOnlyDto
	): BoardItemUpdateModel {
		return {
			title: dto.title,
			content: dto.content,
			isPinned: dto.isPinned
		};
	}
};
