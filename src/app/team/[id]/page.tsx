import { TeamDetailCard } from '@/modules/team/components';
import React from 'react';
import { getTeamWithMembersById } from '@/facades/team/team-facade';

type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const { id } = await params;
	const { error, team } = await getTeamWithMembersById(id);

	if (!team || error) {
		throw new Error('Desired team was not found');
	}

	return (
		<>
			<h1 className="mb-6 text-3xl font-semibold">Team Detail</h1>
			<TeamDetailCard team={team} />
		</>
	);
};

export default Page;
