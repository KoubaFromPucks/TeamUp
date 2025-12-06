import { boardItemRepository } from '@/repositories/board/board-item-repository';
import {
	BoardItemDetailModel,
	BoardItemInsertModel,
	BoardItemListModel,
	BoardItemUpdateModel
} from './schema';
import { boardItemMapper } from './mapper';

export const boardItemService = {
	async doesBoardItemExist(id: string): Promise<boolean> {
		const boardItem = await boardItemRepository.getBoardItemById(id);
		return !!boardItem;
	},

	async createBoardItem(
		boardItem: BoardItemInsertModel
	): Promise<BoardItemListModel> {
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

	async getBoardItemsByConcreteEventId(
		concreteEventId: string
	): Promise<BoardItemListModel[]> {
		const boardItems =
			await boardItemRepository.getBoardItemsByConcreteEventId(
				concreteEventId
			);
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
		if (!(await this.doesBoardItemExist(boardItemId))) {
			throw new Error('Board item does not exist');
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
		if (!(await this.doesBoardItemExist(boardItemId))) {
			throw new Error('Board item does not exist');
		}

		await boardItemRepository.deleteBoardItemById(boardItemId);
	},

	async togglePinBoardItem(
		boardItemId: string
	): Promise<BoardItemListModel> {
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
