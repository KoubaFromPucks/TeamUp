import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { EventForm } from '@/modules/event/components/update-event-form/update-event-form';
import { venueService } from '@/services/venue/service';

const Page = async () => {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	const userId = session?.user?.id;

	if (!userId) {
		throw new Error('not allowed');
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
