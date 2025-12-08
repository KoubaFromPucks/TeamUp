import React, { Suspense } from 'react';;

import { getInvitedEventIdsForUser } from '@/facades/event/helper';
import { EventsListSkeleton } from '@/modules/event/components/skeletons/events-list-skeleton';
import { EventsList } from '@/modules/event/components/events-list';
import { authService } from '@/services/auth/auth-service';

const EventsPage = async () => {
	const sessionUser = await authService.getLoggedUserOrNull();
	const userId = sessionUser?.id ?? null;

	const invitedEventIds = userId
		? await getInvitedEventIdsForUser(userId)
		: new Set<string>();

	return (
		<Suspense fallback={<EventsListSkeleton />}>
			<EventsList
				userId={userId}
				invitedEventIds={invitedEventIds}
				showCreate={!!userId}
			/>
		</Suspense>
	);
};

export default EventsPage;
