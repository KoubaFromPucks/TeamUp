// src/app/events/page.tsx
import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

import { getInvitedEventIdsForUser } from '@/facades/event/helper';
import { EventsListSkeleton } from '@/modules/event/components/skeletons/events-list-skeleton';
import { EventsList } from '@/modules/event/components/events-list';

const EventsPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	const userId = session?.user?.id ?? null;

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
