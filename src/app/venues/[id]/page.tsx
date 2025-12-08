import React from 'react';
import { getVenueById } from '@/facades/venue/venue-facade';
import { VenueDetailCard } from '@/modules/venue/components/venue-detail-card';
import { authService } from '@/services/auth/auth-service';

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
	const { id } = await params;

	const sessionUser = await authService.getLoggedUserOrNull();
	const userId = sessionUser?.id ?? null;

	const { error, venue } = await getVenueById(id);

	if (!venue || error) {
		throw new Error(
			'Error fetching venue data. Either venue does not exist or ther was an error: ' +
				(error ?? '')
		);
	}

	const canManage = !!userId && venue.ownerId === userId;

	return (
		<div>
			<VenueDetailCard venue={venue} canManage={canManage} />
		</div>
	);
}
