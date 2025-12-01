export const pricingTypeEnum = [
	'pre_paid', // event venue is paid in advance for days/weeks/months, users pay for each concrete event, price can vary per concrete event
	'pay_as_you_go', // event venue is not paid in advance, users pay for their share of the total price of the event
	'pay_later' // event venue is paid in advance for days/weeks/months, price of each event is calculated later based on actual attendance of users
] as const;

export type PricingType = (typeof pricingTypeEnum)[number];
