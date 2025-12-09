import { ConcreteEventsList } from '@/modules/concreteEvent/components/concrete-events-list';
import { EventsListSkeleton } from '@/modules/event/components/skeletons/events-list-skeleton';
import React, { Suspense } from 'react';

const Home = async () => {
	return (
		<Suspense fallback={<EventsListSkeleton></EventsListSkeleton>}>
			<ConcreteEventsList></ConcreteEventsList>
		</Suspense>
	);
};

export default Home;
