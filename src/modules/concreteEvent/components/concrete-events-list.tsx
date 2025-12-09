import { getAllConcreteEventsFromCurrentDate } from '@/facades/concrete_event/concrete-event-facade';
import { ConcreteEventCard } from './concrete-event-card';
import React from 'react';

export const ConcreteEventsList = async () => {
	const { error, concreteEvent } = await getAllConcreteEventsFromCurrentDate();
	if (!concreteEvent || error) {
		throw new Error('error fetching concrete events');
	}

	return (
		<div className="flex flex-wrap gap-6">
			{concreteEvent.map(e => (
				<div className="w-100" key={e.id}>
					<ConcreteEventCard
						concreteEvent={e}
						isDetail={false}
						pricePerPerson={undefined}
						isOrganiser={false}
					></ConcreteEventCard>
				</div>
			))}
		</div>
	);
};
