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

type BoardItemWithRelations = {
	id: string;
	eventId: string;
	authorId: string;
	title: string;
	content: string;
	isPinned: boolean;
	createdAt: string;
	updatedAt: string | null;
	authorName: string | null;
	eventName: string | null;
	eventOrganizerId: string | null;
};

function mapEntityToListModel(
	entity: BoardItemSelectEntity | BoardItemWithRelations
): BoardItemListModel {
	const hasRelations = 'authorName' in entity;

	return {
		id: entity.id,
		eventId: entity.eventId,
		authorId: entity.authorId,
		title: entity.title,
		content: entity.content,
		isPinned: entity.isPinned,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
		authorName: hasRelations ? entity.authorName : null,
		eventName: hasRelations ? entity.eventName : null,
		eventOrganizerId: hasRelations ? entity.eventOrganizerId : null
	};
}

function mapEntityToDetailModel(
	entity: BoardItemSelectEntity | BoardItemWithRelations
): BoardItemDetailModel {
	return mapEntityToListModel(entity);
}

export const boardItemMapper = {
	mapEntityToListModel,
	mapEntityToDetailModel,

	mapInsertModelToInsertEntity(
		model: BoardItemInsertModel
	): BoardItemInsertEntity {
		return {
			eventId: model.eventId,
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
