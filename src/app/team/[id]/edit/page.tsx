import React from 'react';

import { ChevronLeft } from 'lucide-react';
import { getTeamWithMembersById } from '@/facades/team/team-facade';
import { UpdateTeamForm } from '@/modules/team/components';
import { authService } from '@/services/auth/auth-service';

type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	await authService.throwIfUserNotLoggedIn(
		'You must be logged in to edit team'
	);

	const { id } = await params;
	const { error, team } = await getTeamWithMembersById(id);
	const returnPath = `/team/${team?.id}`;

	if (!team || error) {
		throw new Error('Team to edit was not found');
	}

	return (
		<>
			<div className="mb-6 flex items-center">
				<a href={returnPath}>
					<ChevronLeft className="h-7 w-7 cursor-pointer" />
				</a>
				<h1 className="text-3xl font-semibold">Edit Team</h1>
			</div>
			<UpdateTeamForm
				team={{ ...team }}
				navPath={returnPath}
				update={true}
				organizerId={team.organizerId}
			/>
		</>
	);
};

export default Page;
