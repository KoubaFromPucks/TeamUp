import { UserCard } from '@/modules/user/components/user-card';
import React from 'react';
import { getUserWithTeamsById } from '@/facades/user/user-facade';
type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const { id } = await params;
	const { error, user } = await getUserWithTeamsById(id);

	if (!user || error) {
		return <div>Error: User not found</div>;
	}

	return (
		<>
			<h1 className="mb-6 text-3xl font-semibold">User Profile</h1>
			<UserCard {...user} />
		</>
	);
};

export default Page;
