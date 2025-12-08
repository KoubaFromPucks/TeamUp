export type VenueDetailModel = {
	id: string;
	name: string;
	address: string;
	gps: string | null;
	description: string | null;
	pricePerHour: number;
	ownerId: string;
};

export type VenueListModel = VenueDetailModel;

export type VenueInsertModel = Omit<VenueListModel, 'id'>;
