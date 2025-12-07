export type BoardItemDetailModel = {
	id: string;
	concreteEventId: string;
	authorId: string;
	title: string;
	content: string;
	isPinned: boolean;
	createdAt: string;
	updatedAt: string | null;
};

export type BoardItemListModel = BoardItemDetailModel;

export type BoardItemInsertModel = Omit<
	BoardItemDetailModel,
	'id' | 'createdAt' | 'updatedAt'
>;

export type BoardItemUpdateModel = Partial<
	Omit<BoardItemInsertModel, 'concreteEventId' | 'authorId'>
>;
