import React from 'react';
import { getOwnedEventsList } from '@/facades/event/event-facade';
import { EventCard } from '@/modules/event/components/event-card';
import { CreateEventCard } from '@/modules/event/components/create-event-card';
import { authService } from '@/services/auth/auth-service';

const Page = async () => {
	const sessionUser = await authService.getLoggedUserOrThrow(
		'You must be logged in to view your owned events.'
	);
    const userId = sessionUser?.id ?? null;

	if (!userId) {
		throw new Error('You have to be logged in to view your owned events.');
	}

	const { error, events } = await getOwnedEventsList(userId);

	if (!events || error) {
		throw new Error('Error fetching owned events data. Either there was an error: ' + (error ?? ''));
	}

	return (
		<div className="flex flex-wrap gap-6">
			<div className="w-100">
				<CreateEventCard href="/events/create" label="Create event" />
			</div>

			{events.map(e => (
				<div className="w-100" key={e.id}>
					<EventCard event={e} isDetail={false} />
				</div>
			))}
		</div>
	);
};

export default Page;
