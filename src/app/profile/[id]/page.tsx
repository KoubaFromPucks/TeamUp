import { UserCard } from '@/modules/user/components';
import React from 'react';
import { getUserWithTeamsById } from '@/facades/user/user-facade';
type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const { id } = await params;
	const { error, user } = await getUserWithTeamsById(id);
	const myProfile = true; // TODO replace with actual logic

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
			<UserCard user={user} myProfile={myProfile} />
		</>
	);
};

export default Page;
