'use server';
import React from 'react';
import { UpdateTeamForm } from '@/modules/team/components';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const Page = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		throw new Error('You must be logged in to create team');
	}

	const loggedUserId = session.user.id;
	return (
		<>
			<h1 className="text-3xl font-semibold">Create Team</h1>
			<UpdateTeamForm
				team={null}
				navPath={`/profile/${loggedUserId}`}
				update={false}
				organizerId={loggedUserId}
			/>
		</>
	);
};

export default Page;
