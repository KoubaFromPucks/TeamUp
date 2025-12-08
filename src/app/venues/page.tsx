import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getAllVenues } from '@/facades/venue/venue-facade';
import { CreateVenueCard } from '@/modules/venue/components/create-venue-card';
import { VenueCard } from '@/modules/venue/components/venue-card';
import { VenueCardSkeleton } from '@/modules/venue/components/skeletons/venue-card-skeleton';

const VenuesList = async ({ userId }: { userId: string | null }) => {
	const { error, venues } = await getAllVenues();

	if (!venues || error) {
		throw new Error('error fetching venues');
	}

	return (
		<div className="flex flex-wrap gap-6">
			{userId && (
				<div className="w-100">
					<CreateVenueCard />
				</div>
			)}

			{venues.map(v => (
				<div className="w-100" key={v.id}>
					<VenueCard venue={v} isDetail={false} />
				</div>
			))}
		</div>
	);
};

export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers()
	});
	const userId = session?.user?.id ?? null;

	return (
		<Suspense
			fallback={
				<div className="flex flex-wrap gap-6">
					{userId && (
						<div className="w-100">
							<CreateVenueCard />
						</div>
					)}
					{Array.from({ length: 6 }).map((_, i) => (
						<div className="w-100" key={i}>
							<VenueCardSkeleton />
						</div>
					))}
				</div>
			}
		>
			<VenuesList userId={userId} />
		</Suspense>
	);
}
