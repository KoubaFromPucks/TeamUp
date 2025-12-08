import { db } from '@/db';
import { boardItemTable } from '@/db/schema/board-item';
import { user as userTable } from '@/db/schema/better-auth';
import { eventTable } from '@/db/schema/event';
import { eq, desc } from 'drizzle-orm';
import type {
	BoardItemSelectEntity,
	BoardItemInsertEntity,
	BoardItemUpdateEntity
} from './schema';

export const boardItemRepository = {
	async createBoardItem(boardItemEntity: BoardItemInsertEntity) {
		const createdBoardItem = await db
			.insert(boardItemTable)
			.values(boardItemEntity)
			.returning();
		return createdBoardItem[0] as BoardItemSelectEntity;
	},

	async getBoardItemById(boardItemId: string) {
		const boardItem = await db
			.select()
			.from(boardItemTable)
			.where(eq(boardItemTable.id, boardItemId))
			.limit(1);
		return boardItem[0] as BoardItemSelectEntity | undefined;
	},

	async getAllBoardItems() {
		const boardItems = await db
			.select({
				id: boardItemTable.id,
				eventId: boardItemTable.eventId,
				authorId: boardItemTable.authorId,
				title: boardItemTable.title,
				content: boardItemTable.content,
				isPinned: boardItemTable.isPinned,
				createdAt: boardItemTable.createdAt,
				updatedAt: boardItemTable.updatedAt,
				authorName: userTable.name,
				eventName: eventTable.name,
				eventOrganizerId: eventTable.organisatorId
			})
			.from(boardItemTable)
			.leftJoin(userTable, eq(boardItemTable.authorId, userTable.id))
			.leftJoin(
				eventTable,
				eq(boardItemTable.eventId, eventTable.id)
			);
		return boardItems;
	},

	async getBoardItemsByEventId(eventId: string) {
		const boardItems = await db
			.select()
			.from(boardItemTable)
			.where(eq(boardItemTable.eventId, eventId));
		return boardItems as BoardItemSelectEntity[];
	},

	async getBoardItemsByAuthorId(authorId: string) {
		const boardItems = await db
			.select()
			.from(boardItemTable)
			.where(eq(boardItemTable.authorId, authorId))
			.orderBy(desc(boardItemTable.createdAt));
		return boardItems as BoardItemSelectEntity[];
	},

	async updateBoardItemById(
		boardItemId: string,
		boardItemEntity: BoardItemUpdateEntity
	) {
		const updatedBoardItem = await db
			.update(boardItemTable)
			.set({
				...boardItemEntity,
				updatedAt: new Date().toISOString()
			})
			.where(eq(boardItemTable.id, boardItemId))
			.returning();
		return updatedBoardItem[0] as BoardItemSelectEntity | undefined;
	},

	async deleteBoardItemById(boardItemId: string) {
		const deletedBoardItem = await db
			.delete(boardItemTable)
			.where(eq(boardItemTable.id, boardItemId))
			.returning();
		return deletedBoardItem[0] as BoardItemSelectEntity | undefined;
	},

	async togglePinBoardItem(boardItemId: string) {
		const boardItem = await this.getBoardItemById(boardItemId);
		if (!boardItem) return undefined;

		return this.updateBoardItemById(boardItemId, {
			isPinned: !boardItem.isPinned
		});
	}
};
