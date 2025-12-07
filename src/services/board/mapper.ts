import {
	BoardItemSelectEntity,
	BoardItemInsertEntity,
	BoardItemUpdateEntity
} from '@/repositories/board/schema';
import {
	BoardItemDetailModel,
	BoardItemInsertModel,
	BoardItemListModel,
	BoardItemUpdateModel
} from './schema';

function mapEntityToListModel(entity: BoardItemSelectEntity | Record<string, unknown>): BoardItemListModel {
	return {
		id: entity.id,
		concreteEventId: entity.concreteEventId,
		authorId: entity.authorId,
		title: entity.title,
		content: entity.content,
		isPinned: entity.isPinned,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
		authorName: entity.authorName ?? null,
		eventName: entity.eventName ?? null,
		eventStartDate: entity.eventStartDate ?? null
	};
}

function mapEntityToDetailModel(entity: BoardItemSelectEntity | Record<string, unknown>): BoardItemDetailModel {
	return mapEntityToListModel(entity);
}

export const boardItemMapper = {
	mapEntityToListModel,
	mapEntityToDetailModel,

	mapInsertModelToInsertEntity(
		model: BoardItemInsertModel
	): BoardItemInsertEntity {
		return {
			concreteEventId: model.concreteEventId,
			authorId: model.authorId,
			title: model.title,
			content: model.content,
			isPinned: model.isPinned,
			updatedAt: null
		};
	},

	mapUpdateModelToUpdateEntity(
		model: BoardItemUpdateModel
	): BoardItemUpdateEntity {
		return {
			title: model.title,
			content: model.content,
			isPinned: model.isPinned
		};
	}
};
