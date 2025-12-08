import React from 'react';
import { Card } from '@/components/card';
import { StandardLink } from '@/components/standard-link';
import { Plus } from 'lucide-react';

type CreateEventCardProps = {
	href?: string;
	label?: string;
};

export const CreateEventCard = ({
	href = '/events/create',
	label = 'Create event'
}: CreateEventCardProps) => (
	<div className="transition-transform hover:-translate-y-1">
		<StandardLink href={href} className="block w-full">
			<Card>
				<div className="flex min-h-[170px] w-full flex-col items-center justify-center gap-3">
					<div className="flex h-12 w-12 items-center justify-center rounded-md border">
						<Plus size={22} />
					</div>
					<span className="text-lg font-semibold">{label}</span>
				</div>
			</Card>
		</StandardLink>
	</div>
);
