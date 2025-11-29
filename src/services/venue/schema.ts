export type VenueDetailModel = {
	Id: string;
	Name: string;
	Address: string;
	GPS: string | null;
	Description: string | null;
	PricePerHour: number;
};

export type VenueListModel = VenueDetailModel;

export type VenueInsertModel = Omit<VenueListModel, 'Id'>;
