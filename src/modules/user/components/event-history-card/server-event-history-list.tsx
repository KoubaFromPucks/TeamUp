'use server';

import React from 'react';
import { EventHistoryCard } from './event-history-card';
import { getUserEventHistoryById } from '@/facades/user/user-facade';

export const ServerEventHistoryList = async ({
	userId
}: {
	userId: string;
}) => {
	const { error, history } = await getUserEventHistoryById(userId);

	if (error) {
		throw new Error('Error fetching user event history');
	}

	if (!history || history.length === 0) {
		return <p>No event history available.</p>;
	}

	return history.map(eventData => (
		<EventHistoryCard key={eventData.concreteEvent.id} userData={eventData} />
	));
};
