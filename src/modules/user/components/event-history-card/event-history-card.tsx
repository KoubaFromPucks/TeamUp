'use client';

import React from 'react';
import { UserEventHistoryDataDto } from '@/facades/user/schema';
import {
	Card,
	CardContent,
	CardHeader,
	CardLabeledItem
} from '@/components/card';
import { InvitationStateItem } from '@/modules/EventInvitation/components/event-invitation-list-card';

export const EventHistoryCard = ({
	userData
}: {
	userData: UserEventHistoryDataDto;
}) => {
	return (
		<Card className="my-2">
			<CardHeader>
				<h2 className="text-center text-2xl leading-tight font-extrabold text-gray-900">
					{userData.event.name}
				</h2>
			</CardHeader>
			<CardContent>
				<CardLabeledItem label="Start - End">
					<p className="text-base font-medium text-gray-700">
						{userData.concreteEvent.startDate} -{' '}
						{userData.concreteEvent.endDate}
					</p>
				</CardLabeledItem>

				<CardLabeledItem label="Invitation State">
					<InvitationStateItem
						state={userData.eventInvitation.state || 'Pending'}
					/>
				</CardLabeledItem>
			</CardContent>
		</Card>
	);
};
