import { getConcreteEventById, isUserEventsOrganizer } from '@/facades/concrete_event/concrete-event-facade';
import { auth } from '@/lib/auth';
import { ConcreteEventForm } from '@/modules/concreteEvent/components/update-concrete-event-form/update-concrete-event-form';
import { authService } from '@/services/auth/auth-service'
import { headers } from 'next/headers';
import React from 'react';

export const Page = async ({ params }: { params: { id: string } }) => {
	await authService.throwIfUserNotLoggedIn(
		'You must be logged in to edit concreteEvent'
	)
	const { id } = await params;
	const { error, concreteEvent } = await getConcreteEventById(id);

	if (error || !concreteEvent) {
		throw new Error('concrete event not found');
	}
	
	const session = await auth.api.getSession({
		headers: await headers()
	});

	const userId = session?.user?.id;

	if (userId) {
		const { isOrganiser } = await isUserEventsOrganizer(id, userId);
		if(!isOrganiser){
			throw new Error('You must be organiser to edit concrete event');
		}
	}

	return (
		<div>
			<h1 className="text-lg font-semibold">Edit Concrete Event</h1>

			<ConcreteEventForm concreteEvent={concreteEvent} navPath={`/concreteEvent/${id}`} />
		</div>
	);
};

export default Page;
