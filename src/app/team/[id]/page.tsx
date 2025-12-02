import { TeamDetailCard } from '@/modules/team/components';
import React from 'react';
import { getTeamWithMembersById } from '@/facades/team/team-facade';
type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const { id } = await params;
	const { error, team } = await getTeamWithMembersById(id);
	const myProfile = true; // TODO replace with actual logic

	if (!team || error) {
		return (
			<h1 className="text-destructive text-3xl font-bold">
				Error: Team not found
			</h1>
		);
	}

	return (
		<>
			<h1 className="mb-6 text-3xl font-semibold">Team Detail</h1>
			<TeamDetailCard team={team} amIAdmin={myProfile} />
		</>
	);
};

export default Page;
