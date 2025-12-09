import React from 'react';
import { UserCard } from './user-card';
import { getUserWithTeamsById } from '@/facades/user/user-facade';

export const ServerUserCard = async ({ userId }: { userId: string }) => {
	const { error, user } = await getUserWithTeamsById(userId);

	if (error || !user) {
		throw new Error('Error fetching user event history.');
	}

	return <UserCard key={user.id} user={user} />;
};
