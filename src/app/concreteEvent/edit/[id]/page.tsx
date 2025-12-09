import {
	getConcreteEventById,
	isUserEventsOrganizer
} from '@/facades/concrete_event/concrete-event-facade';
import { ConcreteEventForm } from '@/modules/concreteEvent/components/update-concrete-event-form/update-concrete-event-form';
import { authService } from '@/services/auth/auth-service';
import React from 'react';

export const Page = async ({ params }: { params: { id: string } }) => {
	const user = await authService.getLoggedUserOrThrow(
		'You must be logged in to edit concreteEvent'
	);
	const { id } = await params;
	const { error, concreteEvent } = await getConcreteEventById(id);

	if (error || !concreteEvent) {
		throw new Error('concrete event not found');
	}

	const { isOrganiser } = await isUserEventsOrganizer(
		concreteEvent.eventId,
		user.id
	);
	if (!isOrganiser) {
		throw new Error('You must be organiser to edit concrete event');
	}

	return (
		<div>
			<h1 className="text-lg font-semibold">Edit Concrete Event</h1>

			<ConcreteEventForm
				concreteEvent={concreteEvent}
				navPath={`/concreteEvent/${id}`}
				eventId={concreteEvent.eventId}
			/>
		</div>
	);
};

export default Page;
