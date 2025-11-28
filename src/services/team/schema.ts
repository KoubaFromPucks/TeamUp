export type TeamSelectModel = {
	id: string;
	name: string;
	description: string;
	imageUrl: string | null;
	organizerId: string;
};

export type TeamInsertModel = Omit<TeamSelectModel, 'id'>;
