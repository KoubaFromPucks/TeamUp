import React from 'react';
import { Card, CardLabeledItem } from '@/components/card';
import { CardContent, CardHeader } from '@/components/card/card';
import { EventListDto } from '@/facades/event/schema';
import { CalendarDays, MapPin, Lock, Users } from 'lucide-react';
import { StandardLink } from '@/components/standard-link';

const inviteTypeLabel: Record<EventListDto['inviteType'], string> = {
	public: 'Public',
	private: 'Private',
	invite_only: 'Invite only'
};

const inviteTypeIcon: Record<EventListDto['inviteType'], React.ReactNode> = {
	public: <Users size={18} />,
	private: <Lock size={18} />,
	invite_only: <Lock size={18} />
};

export const EventCard = ({
	event,
	isDetail
}: {
	event: EventListDto;
	isDetail: boolean;
}) => {
	return (
		<div className="transition-transform hover:-translate-y-1">
			<Card>
				<CardHeader className="flex items-center justify-between text-left">
					<h3 className="text-lg font-semibold">{event.name}</h3>

					<div className="flex gap-3">
						<StandardLink
							href={
								isDetail
									? `/events/edit/${event.id}`
									: `/events/${event.id}`
							}
						>
							{isDetail ? 'Edit' : 'Detail'}
						</StandardLink>
					</div>
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

					<CardLabeledItem label="Venue">
						<div className="flex items-center justify-center gap-2 text-gray-700">
							<MapPin size={18} />
							<span>{event.venueName ?? '—'}</span>
						</div>
					</CardLabeledItem>
				</CardContent>
			</Card>
		</div>
	);
};
