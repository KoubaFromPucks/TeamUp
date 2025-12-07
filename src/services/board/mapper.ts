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

// Type for enriched board items from getAllBoardItems (with joins)
type BoardItemWithRelations = {
	id: string;
	concreteEventId: string;
	authorId: string;
	title: string;
	content: string;
	isPinned: boolean;
	createdAt: string;
	updatedAt: string | null;
	authorName: string | null;
	eventName: string | null;
	eventStartDate: string | null;
};

function mapEntityToListModel(entity: BoardItemSelectEntity | BoardItemWithRelations): BoardItemListModel {
	// Type guard to check if entity has authorName (i.e., is BoardItemWithRelations)
	const hasRelations = 'authorName' in entity;
	
	return {
		id: entity.id,
		concreteEventId: entity.concreteEventId,
		authorId: entity.authorId,
		title: entity.title,
		content: entity.content,
		isPinned: entity.isPinned,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
		authorName: hasRelations ? entity.authorName : null,
		eventName: hasRelations ? entity.eventName : null,
		eventStartDate: hasRelations ? entity.eventStartDate : null
	};
}

function mapEntityToDetailModel(entity: BoardItemSelectEntity | BoardItemWithRelations): BoardItemDetailModel {
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
