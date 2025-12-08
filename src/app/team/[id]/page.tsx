import {
	ServerTeamDetailCard,
	TeamDetailCard
} from '@/modules/team/components';
import React, { Suspense } from 'react';

type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const { id } = await params;

	return (
		<>
			<h1 className="mb-6 text-3xl font-semibold">Team Detail</h1>
			<Suspense fallback={<TeamDetailCard team={undefined} />}>
				<ServerTeamDetailCard teamId={id} />
			</Suspense>
		</>
	);
};

export default Page;
