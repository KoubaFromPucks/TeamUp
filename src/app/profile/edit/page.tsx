import React from 'react';
import { getUserById } from '@/facades/user/user-facade';
import { UpdateUserForm } from '@/modules/user/components/update-user-form';

const Page = async () => {
	const { error, user } = await getUserById('user_1_uuid'); // TODO: replace with actual user ID

	if (!user || error) {
		return (
			<h1 className="text-destructive text-3xl font-bold">
				Error: User not found
			</h1>
		);
	}

	return (
		<>
			<h1 className="mb-6 text-3xl font-semibold">User Profile</h1>
			<UpdateUserForm user={{ ...user }} navPath={`/profile/${user.id}`} />
		</>
	);
};

export default Page;
