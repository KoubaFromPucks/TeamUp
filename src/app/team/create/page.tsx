'use server';
import React from 'react';
import { UpdateTeamForm } from '@/modules/team/components';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { CircleOff } from 'lucide-react';

const Page = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		return (
			<h1 className="text-destructive flex items-center text-3xl font-bold">
				You must be logged in to create team
				<CircleOff className="mx-3 mr-2 h-10 w-10" />
			</h1>
		);
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
