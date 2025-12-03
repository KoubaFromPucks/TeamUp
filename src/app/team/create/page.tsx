'use server';
import React from 'react';
import { UpdateTeamForm } from '@/modules/team/components';

const Page = async () => {
	const loggedUserId = 'd7d7e458-b3fd-4bc2-96c2-4bf2f98fd3ca'; // TODO get logged user id from session
	return (
		<UpdateTeamForm
			team={null}
			navPath={`/profile/${loggedUserId}`}
			update={false}
			organizerId={loggedUserId}
		/>
	);
};

export default Page;
