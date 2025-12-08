import { boardItemRepository } from '@/repositories/board/board-item-repository';
import {
	BoardItemDetailModel,
	BoardItemInsertModel,
	BoardItemListModel,
	BoardItemUpdateModel
} from './schema';
import { boardItemMapper } from './mapper';
import { authService } from '../auth/auth-service';
import { eventRepository } from '@/repositories/event/repository';
import { eventCoorganiserRepository } from '@/repositories/event_coorganiser/event-coorganiser-repository';

export const boardItemService = {
	async doesBoardItemExist(id: string): Promise<boolean> {
		const boardItem = await boardItemRepository.getBoardItemById(id);
		return !!boardItem;
	},

	async canUserModifyBoardItem(
		boardItemId: string,
		userId: string
	): Promise<boolean> {
		const boardItem = await boardItemRepository.getBoardItemById(boardItemId);

		if (!boardItem) {
			return false;
		}

		const event = await eventRepository.getEventById(boardItem.eventId);

		if (!event) {
			return false;
		}

		if (event.organisatorId === userId) {
			return true;
		}

		const coorganisers =
			await eventCoorganiserRepository.getEventCoorganisersByEventId(event.id);

		if (coorganisers.some(coorganiser => coorganiser.userId === userId)) {
			return true;
		}

		return false;
	},

	async createBoardItem(
		boardItem: BoardItemInsertModel
	): Promise<BoardItemListModel> {
		const user = await authService.getLoggedUserOrThrow(
			'You must be logged in to create a board item.'
		);
		boardItem.authorId = user.id;

		const event = await eventRepository.getEventById(boardItem.eventId);

		if (!event) {
			throw new Error('Event not found');
		}

		const isOrganizer = event.organisatorId === user.id;

		const coorganisers =
			await eventCoorganiserRepository.getEventCoorganisersByEventId(event.id);
		const isCoorganizer = coorganisers.some(
			coorganiser => coorganiser.userId === user.id
		);

		if (!isOrganizer && !isCoorganizer) {
			throw new Error(
				'You do not have permission to create a board item for this event. Only the event organizer or coorganizers can create board items.'
			);
		}

		const createEntity =
			boardItemMapper.mapInsertModelToInsertEntity(boardItem);
		const createdBoardItem =
			await boardItemRepository.createBoardItem(createEntity);
		return boardItemMapper.mapEntityToListModel(createdBoardItem);
	},

	async getBoardItemById(boardItemId: string): Promise<BoardItemDetailModel> {
		const boardItem = await boardItemRepository.getBoardItemById(boardItemId);

		if (!boardItem) {
			throw new Error('Board item not found');
		}

		return boardItemMapper.mapEntityToDetailModel(boardItem);
	},

	async getAllBoardItems(): Promise<BoardItemListModel[]> {
		const boardItems = await boardItemRepository.getAllBoardItems();
		return boardItems.map(boardItemMapper.mapEntityToListModel);
	},

	async getBoardItemsForUser(userId: string): Promise<BoardItemListModel[]> {
		const boardItems = await boardItemRepository.getBoardItemsForUser(userId);
		return boardItems.map(boardItemMapper.mapEntityToListModel);
	},

	async getBoardItemsByEventId(eventId: string): Promise<BoardItemListModel[]> {
		const boardItems =
			await boardItemRepository.getBoardItemsByEventId(eventId);
		return boardItems.map(boardItemMapper.mapEntityToListModel);
	},

	async getBoardItemsByAuthorId(
		authorId: string
	): Promise<BoardItemListModel[]> {
		const boardItems =
			await boardItemRepository.getBoardItemsByAuthorId(authorId);
		return boardItems.map(boardItemMapper.mapEntityToListModel);
	},

	async updateBoardItemById(
		boardItemId: string,
		boardItem: BoardItemUpdateModel
	): Promise<BoardItemListModel> {
		const user = await authService.getLoggedUserOrThrow(
			'You must be logged in to update a board item.'
		);

		if (!(await this.doesBoardItemExist(boardItemId))) {
			throw new Error('Board item does not exist');
		}

		if (!(await this.canUserModifyBoardItem(boardItemId, user.id))) {
			throw new Error(
				'You do not have permission to update this board item. Only the event organizer or coorganizers can modify it.'
			);
		}

		const updateEntity =
			boardItemMapper.mapUpdateModelToUpdateEntity(boardItem);

		const updatedBoardItem = await boardItemRepository.updateBoardItemById(
			boardItemId,
			updateEntity
		);

		if (!updatedBoardItem) {
			throw new Error('Board item update failed');
		}

		return boardItemMapper.mapEntityToListModel(updatedBoardItem);
	},

	async deleteBoardItemById(boardItemId: string): Promise<void> {
		const user = await authService.getLoggedUserOrThrow(
			'You must be logged in to delete a board item.'
		);

		if (!(await this.doesBoardItemExist(boardItemId))) {
			throw new Error('Board item does not exist');
		}

		if (!(await this.canUserModifyBoardItem(boardItemId, user.id))) {
			throw new Error(
				'You do not have permission to delete this board item. Only the event organizer or coorganizers can delete it.'
			);
		}

		await boardItemRepository.deleteBoardItemById(boardItemId);
	},

	async togglePinBoardItem(boardItemId: string): Promise<BoardItemListModel> {
		if (!(await this.doesBoardItemExist(boardItemId))) {
			throw new Error('Board item does not exist');
		}

		const toggledBoardItem =
			await boardItemRepository.togglePinBoardItem(boardItemId);

		if (!toggledBoardItem) {
			throw new Error('Board item pin toggle failed');
		}

		return boardItemMapper.mapEntityToListModel(toggledBoardItem);
	}
};
