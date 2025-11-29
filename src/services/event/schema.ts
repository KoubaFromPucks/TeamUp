export type EventDetailModel = {
	id: string;
	venueId: string;
	organisatorId: string;

	name: string;
	startTime: string;
	endTime: string;

	dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
	inviteType: 'public' | 'private' | 'invite_only';
	pricingType: 'pre_paid' | 'pay_as_you_go' | 'pay_later';

	totalPrice: number;
};

export type EventListModel = EventDetailModel;

export type EventInsertModel = Omit<EventListModel, 'id'>;
