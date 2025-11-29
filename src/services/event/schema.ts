export type EventDetailModel = {
	Id: string;
	VenueId: string;
	OrganisatorId: string;

	Name: string;
	StartTime: string;
	EndTime: string;

	DayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
	InviteType: 'public' | 'private' | 'invite_only';
	PricingType: 'pre_paid' | 'pay_as_you_go' | 'pay_later';

	TotalPrice: number;
};

export type EventListModel = EventDetailModel;

export type EventInsertModel = Omit<EventListModel, 'Id'>;
