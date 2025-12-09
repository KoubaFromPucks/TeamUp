'use server';

import React from 'react';
import { UserStatsCard } from './user-stats-card';
import { getUserEventHistoryById } from '@/facades/user/user-facade';
import { UserEventHistoryDataDto } from '@/facades/user/schema';
import { EventStatsList } from './event-stats-list';

export const ServerStatsCard = async ({ userId }: { userId: string }) => {
	const { error, history } = await getUserEventHistoryById(userId);

	if (error) {
		throw new Error('Error while fetching user event history.');
	}

	if (!history || history.length === 0) {
		return <p>No stats available.</p>;
	}

	const invitationsByEvent = history.reduce(
		(acc, curr) => {
			const eventId = curr.event.id;
			if (!acc[eventId]) {
				acc[eventId] = [curr];
			} else {
				acc[eventId].push(curr);
			}

			return acc;
		},
		{} as Record<string, UserEventHistoryDataDto[]>
	);

	return (
		<>
			<UserStatsCard userData={history} title="Overall stats" />
			<EventStatsList invitationsByEvent={invitationsByEvent} />
		</>
	);
};
