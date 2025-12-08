import React from 'react';
import { EventForm } from '@/modules/event/components/update-event-form/update-event-form';
import { venueService } from '@/services/venue/service';
import { authService } from '@/services/auth/auth-service';

const Page = async () => {
	const sessionUser = await authService.getLoggedUserOrThrow(
		'You must be logged in to create an event.'
	);

	const userId = sessionUser?.id;

	if (!userId) {
		throw new Error('You have to be logged in to create an event.');
	}

	const venues = await venueService.getAllVenues();

	return (
		<div>
			<h1 className="mb-4 text-lg font-semibold">Create Event</h1>

			<EventForm
				navPath="/events"
				organisatorId={userId}
				venues={venues.map(v => ({ id: v.id, name: v.name }))}
			/>
		</div>
	);
};

export default Page;
