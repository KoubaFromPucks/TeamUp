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

export const boardItemMapper = {
	mapEntityToListModel(entity: BoardItemSelectEntity): BoardItemListModel {
		return {
			id: entity.id,
			concreteEventId: entity.concreteEventId,
			authorId: entity.authorId,
			title: entity.title,
			content: entity.content,
			isPinned: entity.isPinned,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		};
	},

	mapEntityToDetailModel(entity: BoardItemSelectEntity): BoardItemDetailModel {
		return this.mapEntityToListModel(entity);
	},

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
