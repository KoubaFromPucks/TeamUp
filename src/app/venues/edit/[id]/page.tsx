import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getVenueById } from '@/facades/venue/venue-facade';
import { VenueForm } from '@/modules/venue/components/update-venue-form/update-venue-form';

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
	const { id } = await params;

	const session = await auth.api.getSession({
		headers: await headers()
	});
	const userId = session?.user?.id ?? null;

	if (!userId) {
		throw new Error('not allowed');
	}

	const { error, venue } = await getVenueById(id);

	if (!venue || error) {
		throw new Error('venue not found');
	}

	const canManage = venue.ownerId === userId;
	if (!canManage) {
		throw new Error('not allowed');
	}

	return (
		<div>
			<h1 className="mb-4 text-lg font-semibold">Edit Venue</h1>

			<VenueForm venue={venue} navPath="/venues" ownerId={userId} />
		</div>
	);
}
