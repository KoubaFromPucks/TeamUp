import React from 'react';
import { getVenueById } from '@/facades/venue/venue-facade';
import { VenueForm } from '@/modules/venue/components/update-venue-form/update-venue-form';
import { authService } from '@/services/auth/auth-service';

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
	const { id } = await params;

	const sessionUser = await authService.getLoggedUserOrThrow(
		'You must be logged in to edit a venue.'
	);
	const userId = sessionUser?.id ?? null;

	if (!userId) {
		throw new Error('You have to be logged in to edit a venue.');
	}

	const { error, venue } = await getVenueById(id);

	if (!venue || error) {
		throw new Error(
			'Error fetching venue data. Either venue does not exist or there was an error: ' +
				(error ?? '')
		);
	}

	const canManage = venue.ownerId === userId;
	if (!canManage) {
		throw new Error('Only owner of the venue is allowed to edit it.');
	}

	return (
		<div>
			<h1 className="mb-4 text-lg font-semibold">Edit Venue</h1>

			<VenueForm venue={venue} navPath="/venues" ownerId={userId} />
		</div>
	);
}
