import React from 'react';
import { VenueForm } from '@/modules/venue/components/update-venue-form/update-venue-form';
import { authService } from '@/services/auth/auth-service';

export default async function Page() {
	const sessionUser = await authService.getLoggedUserOrThrow(
		'You must be logged in to create a venue.'
	);
	const userId = sessionUser?.id ?? null;

	if (!userId) {
		throw new Error('You have to be logged in to create a venue.');
	}

	return (
		<div>
			<h1 className="mb-4 text-lg font-semibold">Create Venue</h1>
			<VenueForm navPath="/venues" ownerId={userId} />
		</div>
	);
}
