'use client';

import React from 'react';
import { UserEventHistoryDataDto } from '@/facades/user/schema';
import { Card, CardContent, CardLabeledItem } from '@/components/card';

export const UserStatsCard = ({
	userData
}: {
	userData: UserEventHistoryDataDto[];
}) => {
	const totalEvents = userData.length;
	const acceptedInvitations = userData.filter(
		data => data.eventInvitation.state === 'Accepted'
	).length;
	const declinedInvitations = userData.filter(
		data => data.eventInvitation.state === 'Declined'
	).length;
	const pendingInvitations = userData.filter(
		data => data.eventInvitation.state === 'Pending'
	).length;

	return (
		<Card className="my-2">
			<CardContent>
				<CardLabeledItem label="Total invitations">
					<p className="text-base font-medium text-gray-700">{totalEvents}</p>
				</CardLabeledItem>
				<CardLabeledItem label="Accepted invitations">
					<p className="text-base font-medium text-gray-700">
						{acceptedInvitations} (
						{totalEvents > 0
							? ((acceptedInvitations / totalEvents) * 100).toFixed(2)
							: '0.00'}
						%)
					</p>
				</CardLabeledItem>
				<CardLabeledItem label="Declined invitations">
					<p className="text-base font-medium text-gray-700">
						{declinedInvitations} (
						{totalEvents > 0
							? ((declinedInvitations / totalEvents) * 100).toFixed(2)
							: '0.00'}
						%)
					</p>
				</CardLabeledItem>
				<CardLabeledItem label="Pending invitations">
					<p className="text-base font-medium text-gray-700">
						{pendingInvitations} (
						{totalEvents > 0
							? ((pendingInvitations / totalEvents) * 100).toFixed(2)
							: '0.00'}
						%)
					</p>
				</CardLabeledItem>
			</CardContent>
		</Card>
	);
};
