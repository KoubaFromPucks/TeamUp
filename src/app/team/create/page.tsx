'use server';
import React from 'react';
import { UpdateTeamForm } from '@/modules/team/components';
import { authService } from '@/services/auth/auth-service';

const Page = async () => {
	await authService.throwIfUserNotLoggedIn(
		'You must be logged in to create team'
	);
	const user = await authService.getLoggedUserOrThrow();
	const loggedUserId = user.id;

	return (
		<>
			<h1 className="text-3xl font-semibold">Create Team</h1>
			<UpdateTeamForm
				team={null}
				navPath={`/user/${loggedUserId}`}
				update={false}
				organizerId={loggedUserId}
			/>
		</>
	);
};

export default Page;
