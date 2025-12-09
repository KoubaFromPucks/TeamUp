import React from 'react';
import { TeamDetailCard } from './team-detail-card';
import { getTeamWithMembersById } from '@/facades/team/team-facade';

export const ServerTeamDetailCard = async ({ teamId }: { teamId: string }) => {
	const { error, team } = await getTeamWithMembersById(teamId);

	if (error || !team) {
		throw new Error('Error while fetching team details.');
	}

	return <TeamDetailCard team={team} />;
};
