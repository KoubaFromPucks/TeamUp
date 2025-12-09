import { ConcreteEventsList } from '@/modules/concreteEvent/components/concrete-events-list';
import { EventsListSkeleton } from '@/modules/event/components/skeletons/events-list-skeleton';
import React, { Suspense } from 'react';
import { eventService } from '@/services/event/service';

const Home = async () => {
	await eventService.getPriceForPayLaterOptionSelectedForEachConcreteEvent(
		'9d15b9ea-061c-4747-9215-b1d2c93b693f'
	);

	return (
		<Suspense fallback={<EventsListSkeleton></EventsListSkeleton>}>
			<ConcreteEventsList></ConcreteEventsList>
		</Suspense>
	);
};

export default Home;
