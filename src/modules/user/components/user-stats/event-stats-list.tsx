'use client';

import React, { useState } from 'react';
import { UserEventHistoryDataDto } from '@/facades/user/schema';
import { UserStatsCard } from './user-stats-card';
import { Button } from '@/components/basic-components/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const EventStatsList = ({
	invitationsByEvent
}: {
	invitationsByEvent: Record<string, UserEventHistoryDataDto[]>;
}) => {
	const [hideStats, setHideStats] = useState(true);

	return (
		<>
			<h1 className="text-3xl font-semibold">
				Specific Event Stats{' '}
				<Button variant="ghost" onClick={() => setHideStats(!hideStats)}>
					{hideStats ? <ChevronUp /> : <ChevronDown />}
				</Button>
			</h1>
			<div className={hideStats ? '' : 'hidden'}>
				{Object.entries(invitationsByEvent).map(([eventId, invitations]) => (
					<UserStatsCard
						key={eventId}
						userData={invitations}
						title={`${invitations[0].event.name} Stats`}
					/>
				))}
			</div>
		</>
	);
};
