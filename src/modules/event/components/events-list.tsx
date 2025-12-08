import React from 'react';
import { getEventsList } from '@/facades/event/event-facade';
import { EventCard } from './event-card';
import { CreateEventCard } from './create-event-card';

export type EventsListProps = {
	userId: string | null;
	invitedEventIds: Set<string>;
	showCreate?: boolean;
};

export const EventsList = async ({
	userId,
	invitedEventIds,
	showCreate = false
}: EventsListProps) => {
	const { error, events } = await getEventsList({
		userId,
		invitedEventIds
	});

	if (!events || error) {
		throw new Error(
			'Error fetching events data. Either event does not exist or there was an error: ' +
				(error ?? '')
		);
	}

	return (
		<div className="flex flex-wrap gap-6">
			{showCreate && (
				<div className="w-100">
					<CreateEventCard href="/events/create" />
				</div>
			)}

			{events.map(e => (
				<div className="w-100" key={e.id}>
					<EventCard event={e} isDetail={false} />
				</div>
			))}
		</div>
	);
};
