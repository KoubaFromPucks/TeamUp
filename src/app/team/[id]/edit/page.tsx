import React from 'react';

import { ChevronLeft } from 'lucide-react';
import { CircleOff } from 'lucide-react';
import { getTeamWithMembersById } from '@/facades/team/team-facade';
import { UpdateTeamForm } from '@/modules/team/components/update-team-form';

type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const { id } = await params;
	const { error, team } = await getTeamWithMembersById(id);
	const returnPath = `/team/${team?.id}`;

	if (!team || error) {
		return (
			<h1 className="text-destructive flex items-center text-3xl font-bold">
				{error ?? 'Team not found'}
				<CircleOff className="mx-3 mr-2 h-10 w-10" />
			</h1>
		);
	}

	return (
		<>
			<div className="mb-6 flex items-center">
				<a href={returnPath}>
					<ChevronLeft className="h-7 w-7 cursor-pointer" />
				</a>
				<h1 className="text-3xl font-semibold">Edit Team</h1>
			</div>
			<UpdateTeamForm team={{ ...team }} navPath={returnPath} update={true} />
		</>
	);
};

export default Page;
