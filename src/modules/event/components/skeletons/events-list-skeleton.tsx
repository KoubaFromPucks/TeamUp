import React from 'react';
import { EventCardSkeleton } from './event-card-skeleton';

export const EventsListSkeleton = () => (
	<div className="flex flex-wrap gap-6">
		{Array.from({ length: 2 }).map((_, i) => (
			<div className="w-100" key={i}>
				<EventCardSkeleton />
			</div>
		))}
	</div>
);
