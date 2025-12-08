import React from 'react';
import { Card } from '@/components/card';
import { CardContent, CardHeader } from '@/components/card/card';

const LabeledBlock = () => (
	<div className="mt-4 text-center">
		<div className="mx-auto mb-2 h-5 w-20 animate-pulse rounded bg-gray-200" />
		<hr className="mb-2 border-black" />
		<div className="mx-auto h-4 w-28 animate-pulse rounded bg-gray-200" />
	</div>
);

export const VenueCardSkeleton = () => (
	<div className="transition-transform">
		<Card>
			<CardHeader className="flex items-center justify-between text-left">
				<div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
				<div className="h-5 w-12 animate-pulse rounded bg-gray-200" />
			</CardHeader>

			<CardContent className="gap-6">
				<LabeledBlock />
				<LabeledBlock />
			</CardContent>
		</Card>
	</div>
);
