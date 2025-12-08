import React from 'react';
import { getEventById } from '@/facades/event/event-facade';
import { EventForm } from '@/modules/event/components/update-event-form/update-event-form';
import { venueService } from '@/services/venue/service';
import { authService } from '@/services/auth/auth-service';

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	
	const sessionUser = await authService.getLoggedUserOrThrow(
		'You must be logged in to edit event.'
	);

	const userId = sessionUser?.id ?? null;

	const { error, event } = await getEventById(id);

	if (error || !event) {
		throw new Error('Error fetching event data. Either event does not exist or ther was an error: ' + (error ?? ''));
	}

	if (!userId || userId !== event.organisatorId) {
		throw new Error('Only orginizators of the event are allowed to edit it.');
	}

	const venues = await venueService.getAllVenues();

	return (
		<div>
			<h1 className="mb-4 text-lg font-semibold">Edit Event</h1>
			<EventForm
				event={event}
				navPath={`/events/${id}`}
				organisatorId={userId}
				venues={venues.map(v => ({ id: v.id, name: v.name }))}
			/>
		</div>
	);
}
