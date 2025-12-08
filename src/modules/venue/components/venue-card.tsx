import React from 'react';
import { Card, CardLabeledItem } from '@/components/card';
import { CardContent, CardHeader } from '@/components/card/card';
import { StandardLink } from '@/components/standard-link';
import { MapPin, DollarSign } from 'lucide-react';
import type { VenueListDto } from '@/facades/venue/schema';

export const VenueCard = ({
	venue,
	isDetail
}: {
	venue: VenueListDto;
	isDetail: boolean;
}) => (
	<div className="transition-transform hover:-translate-y-1">
		<Card>
			<CardHeader className="flex items-center justify-between text-left">
				<h3 className="text-lg font-semibold">{venue.name}</h3>

				<div className="flex gap-3">
					<StandardLink
						href={isDetail ? `/venues/edit/${venue.id}` : `/venues/${venue.id}`}
					>
						{isDetail ? 'Edit' : 'Detail'}
					</StandardLink>
				</div>
			</CardHeader>

			<CardContent className="gap-6">
				<CardLabeledItem label="Address">
					<div className="flex items-center justify-center gap-2 text-gray-700">
						<MapPin size={18} />
						<span>{venue.address}</span>
					</div>
				</CardLabeledItem>

				<CardLabeledItem label="Price / hour">
					<div className="flex items-center justify-center gap-2 text-gray-700">
						<DollarSign size={18} />
						<span className="font-semibold">{venue.pricePerHour ?? 0}</span>
					</div>
				</CardLabeledItem>
			</CardContent>
		</Card>
	</div>
);
