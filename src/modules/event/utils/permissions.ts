import type { EventDetailDto } from '@/facades/event/schema';

export const getEventPermissions = ({
	event,
	userId,
	invitedEventIds
}: {
	event: Pick<EventDetailDto, 'id' | 'inviteType' | 'organisatorId'>;
	userId: string | null;
	invitedEventIds: Set<string>;
}) => {
	const isLoggedIn = !!userId;
	const isOrganisator = isLoggedIn && event.organisatorId === userId;

	const canSee =
		event.inviteType === 'public' ||
		(isLoggedIn &&
			(isOrganisator ||
				event.inviteType === 'private' ||
				(event.inviteType === 'invite_only' &&
					invitedEventIds.has(event.id))));

	const canManage = isOrganisator;

	return { canSee, canManage };
};
