export const inviteStateEnum = [
	'Accepted',
	'Declined',
	'Not sure',
	'Pending'
] as const;

export type InviteState = (typeof inviteStateEnum)[number];
