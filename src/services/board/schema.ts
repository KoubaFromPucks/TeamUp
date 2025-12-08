export type BoardItemDetailModel = {
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

export type BoardItemListModel = BoardItemDetailModel;

export type BoardItemInsertModel = Omit<
	BoardItemDetailModel,
	| 'id'
	| 'createdAt'
	| 'updatedAt'
	| 'authorName'
	| 'eventName'
	| 'eventOrganizerId'
>;

export type BoardItemUpdateModel = Partial<
	Omit<BoardItemInsertModel, 'eventId' | 'authorId'>
>;
