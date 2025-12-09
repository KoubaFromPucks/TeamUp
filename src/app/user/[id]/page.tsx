import { ServerUserCard, UserCard } from '@/modules/user/components';
import React, { Suspense } from 'react';
import { ServerEventHistoryList } from '@/modules/user/components';
import { ServerStatsCard } from '@/modules/user/components';
type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
	const { id } = await params;

	return (
		<>
			<h1 className="mb-6 text-3xl font-semibold">User Profile</h1>
			<Suspense fallback={<UserCard user={undefined} />}>
				<ServerUserCard userId={id} />
			</Suspense>

			<h1 className="mt-6 text-3xl font-semibold">User Stats</h1>
			<Suspense fallback={<p>Loading user stats...</p>}>
				<ServerStatsCard userId={id} />
			</Suspense>

			<h1 className="mt-6 text-3xl font-semibold">User Event History</h1>
			<Suspense fallback={<p>Loading event history...</p>}>
				<ServerEventHistoryList userId={id} />
			</Suspense>
		</>
	);
};

export default Page;
