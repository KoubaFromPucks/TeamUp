import { UserCard } from '@/modules/user/components';
import React, { Suspense } from 'react';
import { getUserWithTeamsById } from '@/facades/user/user-facade';
import { ServerEventHistoryList } from '@/modules/user/components';
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
			<h1 className="mt-6 text-3xl font-semibold">User Event History</h1>
			<Suspense fallback={<p>Loading event history...</p>}>
				<ServerEventHistoryList
					userId={'6cc10416-8fc6-4a12-92d2-6fbaa5648819'}
				/>
				{
					// TODO real id
				}
			</Suspense>
		</>
	);
};

export default Page;
