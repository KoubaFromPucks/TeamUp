import { UserCard } from '@/modules/user/components';
import React from 'react';
import { getUserWithTeamsById } from '@/facades/user/user-facade';
type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const { id } = await params;
	const { error, user } = await getUserWithTeamsById(id);

	if (!user || error) {
		throw new Error('Desired user was not found');
	}

	return (
		<>
			<h1 className="mb-6 text-3xl font-semibold">User Profile</h1>
			<UserCard user={user} />
		</>
	);
};

export default Page;
