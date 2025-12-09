import { Card, CardLabeledItem } from '@/components/card';
import { CardContent, CardHeader } from '@/components/card/card';
import { ConcreteEventListDto } from '@/facades/concrete_event/schema';
import { CalendarDays, DollarSign } from 'lucide-react';
import { DeleteConcreteEventButton } from './delete-concrete-event-button';
import React from 'react';
import { StandardLink } from '@/components/standard-link';

export const ConcreteEventCard = ({
	concreteEvent,
	isDetail,
	pricePerPerson,
	isOrganiser
}: {
	concreteEvent: ConcreteEventListDto;
	isDetail: boolean;
	pricePerPerson: number | undefined;
	isOrganiser: boolean;
}) => {
	return (
		<div className="transition-transform hover:-translate-y-1">
			<Card>
				<CardHeader className="flex items-center justify-between text-left">
					<h3 className="text-lg font-semibold">{concreteEvent.eventName}</h3>

					<div className="flex gap-3">
						{isDetail && isOrganiser && (
							<DeleteConcreteEventButton
								id={concreteEvent.id}
								route={`/events/${concreteEvent.eventId}`}
							/>
						)}

						{!isDetail && (
							<StandardLink href={`/concreteEvent/${concreteEvent.id}`}>
								Detail
							</StandardLink>
						)}

						{isDetail && isOrganiser && (
							<StandardLink href={`/concreteEvent/edit/${concreteEvent.id}`}>
								Edit
							</StandardLink>
						)}
					</div>
				</CardHeader>

				<CardContent className="gap-6">
					<CardLabeledItem label="Date">
						<div className="flex items-center justify-center gap-2 text-gray-700">
							<CalendarDays size={18} />
							<span>
								{new Date(concreteEvent.startDate).toLocaleString()} –{' '}
								{new Date(concreteEvent.endDate).toLocaleString()}
							</span>
						</div>
					</CardLabeledItem>

					<CardLabeledItem label="Total price">
						<div className="flex items-center justify-center gap-2 text-gray-700">
							<DollarSign size={18} />
							<span className="font-semibold">{concreteEvent.price}</span>
						</div>
					</CardLabeledItem>
					{pricePerPerson && (
						<CardLabeledItem label="Price per person">
							<div className="flex items-center justify-center gap-2 text-gray-700">
								<DollarSign size={18} />
								<span className="font-semibold">
									{Number(pricePerPerson).toFixed(2)}
								</span>
							</div>
						</CardLabeledItem>
					)}
				</CardContent>
			</Card>
		</div>
	);
};
