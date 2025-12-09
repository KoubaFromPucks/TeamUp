import type { EventDetailDto } from '@/facades/event/schema';
import { eventService } from '@/services/event/service';

export const getEventPermissions = async ({
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

	const canManage =
		(await (isLoggedIn && eventService.isUserCoorganiser(event.id, userId))) ||
		isOrganisator;

	const canSee =
		event.inviteType === 'public' ||
		(isLoggedIn &&
			(isOrganisator ||
				event.inviteType === 'private' ||
				(event.inviteType === 'invite_only' && invitedEventIds.has(event.id))));

	const isOwner = isOrganisator;

	return { canSee, canManage, isOwner };
};
