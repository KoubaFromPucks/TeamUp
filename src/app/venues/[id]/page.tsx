import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getVenueById } from '@/facades/venue/venue-facade';
import { VenueDetailCard } from '@/modules/venue/components/venue-detail-card';

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
	const { id } = await params;

	const session = await auth.api.getSession({
		headers: await headers()
	});
	const userId = session?.user?.id ?? null;

	const { error, venue } = await getVenueById(id);

	if (!venue || error) {
		throw new Error('error fetching venue');
	}

	const canManage = !!userId && venue.ownerId === userId;

	return (
		<div>
			<VenueDetailCard venue={venue} canManage={canManage} />
		</div>
	);
}
