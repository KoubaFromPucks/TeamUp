import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getAllVenues } from '@/facades/venue/venue-facade';
import { VenueForm } from '@/modules/venue/components/update-venue-form/update-venue-form';


export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers()
	});
	const userId = session?.user?.id ?? null;

	if (!userId) {
		throw new Error('not allowed');
	}

	// tady nemusíš fetchovat nic dalšího, form je čistý
	return (
		<div>
			<h1 className="mb-4 text-lg font-semibold">Create Venue</h1>
			<VenueForm navPath="/venues" ownerId={userId} />
		</div>
	);
}
