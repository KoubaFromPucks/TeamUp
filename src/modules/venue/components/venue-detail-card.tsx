import React from 'react';
import { Card, CardLabeledItem } from '@/components/card';
import { CardContent, CardHeader } from '@/components/card/card';
import { StandardLink } from '@/components/standard-link';
import { DeleteVenueButton } from './delete-venue-button/delete-venue-button';
import { MapPin, DollarSign, Info } from 'lucide-react';
import type { VenueDetailDto } from '@/facades/venue/schema';

export const VenueDetailCard = ({
	venue,
	canManage
}: {
	venue: VenueDetailDto;
	canManage: boolean;
}) => (
	<div className="transition-transform">
		<Card>
			<CardHeader className="flex items-center justify-between text-left">
				<h3 className="text-lg font-semibold">{venue.name}</h3>

				{canManage && (
					<div className="flex gap-3">
						<StandardLink href={`/venues/edit/${venue.id}`}>Edit</StandardLink>
						<DeleteVenueButton id={venue.id} />
					</div>
				)}
			</CardHeader>

			<CardContent className="gap-6">
				<CardLabeledItem label="Address">
					<div className="flex items-center justify-center gap-2 text-gray-700">
						<MapPin size={18} />
						<span>{venue.address}</span>
					</div>
				</CardLabeledItem>

				<CardLabeledItem label="GPS">
					<div className="flex items-center justify-center gap-2 text-gray-700">
						<Info size={18} />
						<span>{venue.gps ?? '—'}</span>
					</div>
				</CardLabeledItem>

				<CardLabeledItem label="Price / hour">
					<div className="flex items-center justify-center gap-2 text-gray-700">
						<DollarSign size={18} />
						<span className="font-semibold">{venue.pricePerHour ?? 0}</span>
					</div>
				</CardLabeledItem>

				<CardLabeledItem label="Description">
					<div className="flex items-center justify-center gap-2 text-gray-700">
						<span className="font-semibold">{venue.description}</span>
					</div>
				</CardLabeledItem>
			</CardContent>
		</Card>
	</div>
);
