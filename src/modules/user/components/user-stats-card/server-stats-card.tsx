'use server';

import React from 'react';
import { UserStatsCard } from './user-stats-card';
import { getUserEventHistoryById } from '@/facades/user/user-facade';

export const ServerStatsCard = async ({ userId }: { userId: string }) => {
	const { error, history } = await getUserEventHistoryById(userId);

	if (error) {
		throw new Error('Error fetching user event history');
	}

	if (!history || history.length === 0) {
		return <p>No stats available.</p>;
	}

	return <UserStatsCard userData={history} />;
};
