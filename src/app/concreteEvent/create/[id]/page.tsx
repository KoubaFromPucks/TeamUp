import { isUserEventsOrganizer } from '@/facades/concrete_event/concrete-event-facade';
import { ConcreteEventForm } from '@/modules/concreteEvent/components/update-concrete-event-form/update-concrete-event-form';
import { authService } from '@/services/auth/auth-service';
import React from 'react';

export const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = await params;
	const user = await authService.getLoggedUserOrThrow(
		'You must be logged in to edit concreteEvent'
	);
	const { isOrganiser } = await isUserEventsOrganizer(id, user.id);
	if (!isOrganiser) {
		throw new Error('You must be organiser to edit concrete event');
	}
	return (
		<div>
			<h1 className="text-lg font-semibold">Create Concrete Event</h1>

			<ConcreteEventForm
				concreteEvent={undefined}
				navPath={`/events/${id}`}
				eventId={id}
			/>
		</div>
	);
};

export default Page;
