import React from 'react';
import { Card, CardLabeledItem } from '@/components/card';
import { CardContent, CardHeader } from '@/components/card/card';
import { StandardLink } from '@/components/standard-link';
import { DeleteEventButton } from './delete-event-button/delete-event-button';
import { CalendarDays, Lock, Users, DollarSign, BadgeInfo } from 'lucide-react';
import type { EventDetailDto } from '@/facades/event/schema';
import { pricingTypeLabels } from './update-event-form/update-event-form-enums';

type EventDetailCardProps = {
	event: EventDetailDto;
	canManage: boolean;
};

const inviteTypeLabel: Record<'public' | 'private' | 'invite_only', string> = {
	public: 'Public',
	private: 'Private',
	invite_only: 'Invite only'
};

const inviteTypeIcon: Record<
	'public' | 'private' | 'invite_only',
	React.ReactNode
> = {
	public: <Users size={18} />,
	private: <Lock size={18} />,
	invite_only: <Lock size={18} />
};

export const EventDetailCard = ({ event, canManage }: EventDetailCardProps) => (
	<div className="transition-transform">
		<Card>
			<CardHeader className="flex items-center justify-between text-left">
				<h3 className="text-lg font-semibold">{event.name}</h3>

				{canManage ? (
					<div className="flex gap-3">
						<StandardLink href={`/events/edit/${event.id}`}>Edit</StandardLink>
						<DeleteEventButton id={event.id} />
					</div>
				) : (
					<div className="invisible flex gap-3">
						<span className="px-3 py-5" />
					</div>
				)}
			</CardHeader>

			<CardContent className="gap-6">
				<CardLabeledItem label="Type">
					<div className="flex items-center justify-center gap-2 text-gray-700">
						{inviteTypeIcon[event.inviteType]}
						<span>{inviteTypeLabel[event.inviteType]}</span>
					</div>
				</CardLabeledItem>

				<CardLabeledItem label="Time">
					<div className="flex items-center justify-center gap-2 text-gray-700">
						<CalendarDays size={18} />
						<span>
							{event.dayOfWeek} {event.startTime} – {event.endTime}
						</span>
					</div>
				</CardLabeledItem>
				{canManage && (
					<>
						<CardLabeledItem label="Pricing">
							<div className="flex items-center justify-center gap-2 text-gray-700">
								<BadgeInfo size={18} />
								<span>{pricingTypeLabels[event.pricingType]}</span>
							</div>
						</CardLabeledItem>

						<CardLabeledItem label="Total price">
							<div className="flex items-center justify-center gap-2 text-gray-700">
								<DollarSign size={18} />
								<span className="font-semibold">{event.totalPrice ?? 0}</span>
							</div>
						</CardLabeledItem>
					</>
				)}
			</CardContent>
		</Card>
	</div>
);
