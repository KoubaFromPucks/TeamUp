import { dayOfWeekEnum, inviteTypeEnum, pricingTypeEnum } from "@/facades/event/schema";

const dayOfWeekLabels: Record<(typeof dayOfWeekEnum)[number], string> = {
	Mon: 'Monday',
	Tue: 'Tuesday',
	Wed: 'Wednesday',
	Thu: 'Thursday',
	Fri: 'Friday',
	Sat: 'Saturday',
	Sun: 'Sunday'
};

const inviteTypeLabels: Record<(typeof inviteTypeEnum)[number], string> = {
	public: 'Public',
	private: 'Private (sign-up only)',
	invite_only: 'Invite only'
};

const pricingTypeLabels: Record<(typeof pricingTypeEnum)[number], string> = {
	pre_paid: 'Pre-paid',
	pay_as_you_go: 'Pay as you go',
	pay_later: 'Pay later'
};

export {
    dayOfWeekLabels,
    inviteTypeLabels,
    pricingTypeLabels
};