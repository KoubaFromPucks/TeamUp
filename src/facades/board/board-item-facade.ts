'use server';

import { boardItemService } from '@/services/board/board-item-service';
import { boardItemFacadeMapper } from './mapper';
import {
	BoardItemCreateUpdateDto,
	BoardItemUpdateOnlyDto,
	boardItemCreateUpdateSchema,
	boardItemUpdateOnlySchema
} from './schema';

export async function createBoardItem(boardItem: BoardItemCreateUpdateDto) {
	const validationResult = boardItemCreateUpdateSchema.safeParse(boardItem);

	if (!validationResult.success) {
		const errors = validationResult.error.flatten().fieldErrors;
		return { error: errors, boardItem: null };
	}

	try {
		const insertModel = boardItemFacadeMapper.mapCreateUpdateDtoToInsertModel(
			validationResult.data
		);
		const result = await boardItemService.createBoardItem(insertModel);
		return {
			error: null,
			boardItem: boardItemFacadeMapper.mapListModelToDto(result)
		};
	} catch (error) {
		return { error: (error as Error).message, boardItem: null };
	}
}

export async function getBoardItemById(boardItemId: string) {
	try {
		const result = await boardItemService.getBoardItemById(boardItemId);
		return {
			error: null,
			boardItem: boardItemFacadeMapper.mapDetailModelToDto(result)
		};
	} catch (error) {
		return { error: (error as Error).message, boardItem: null };
	}
}

export async function getAllBoardItems() {
	try {
		const result = await boardItemService.getAllBoardItems();
		return {
			error: null,
			boardItems: result.map(boardItemFacadeMapper.mapListModelToDto)
		};
	} catch (error) {
		return { error: (error as Error).message, boardItems: null };
	}
}

export async function getBoardItemsByEventId(eventId: string) {
	try {
		const result =
			await boardItemService.getBoardItemsByEventId(eventId);
		return {
			error: null,
			boardItems: result.map(boardItemFacadeMapper.mapListModelToDto)
		};
	} catch (error) {
		return { error: (error as Error).message, boardItems: null };
	}
}

export async function getBoardItemsByAuthorId(authorId: string) {
	try {
		const result = await boardItemService.getBoardItemsByAuthorId(authorId);
		return {
			error: null,
			boardItems: result.map(boardItemFacadeMapper.mapListModelToDto)
		};
	} catch (error) {
		return { error: (error as Error).message, boardItems: null };
	}
}

export async function updateBoardItemById(
	boardItemId: string,
	boardItem: BoardItemUpdateOnlyDto
) {
	const validationResult = boardItemUpdateOnlySchema.safeParse(boardItem);

	if (!validationResult.success) {
		const errors = validationResult.error.flatten().fieldErrors;
		return { error: errors, boardItem: null };
	}

	try {
		const updateModel = boardItemFacadeMapper.mapUpdateOnlyDtoToUpdateModel(
			validationResult.data
		);
		const result = await boardItemService.updateBoardItemById(
			boardItemId,
			updateModel
		);
		return {
			error: null,
			boardItem: boardItemFacadeMapper.mapListModelToDto(result)
		};
	} catch (error) {
		return { error: (error as Error).message, boardItem: null };
	}
}

export async function deleteBoardItemById(boardItemId: string) {
	try {
		await boardItemService.deleteBoardItemById(boardItemId);
		return { error: null, success: true };
	} catch (error) {
		return { error: (error as Error).message, success: false };
	}
}

export async function togglePinBoardItem(boardItemId: string) {
	try {
		const result = await boardItemService.togglePinBoardItem(boardItemId);
		return {
			error: null,
			boardItem: boardItemFacadeMapper.mapListModelToDto(result)
		};
	} catch (error) {
		return { error: (error as Error).message, boardItem: null };
	}
}
