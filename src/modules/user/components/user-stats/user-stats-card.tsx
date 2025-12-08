'use client';

import React from 'react';
import { UserEventHistoryDataDto } from '@/facades/user/schema';
import {
	Card,
	CardContent,
	CardHeader,
	CardLabeledItem
} from '@/components/card';

const getStatsCountByInvitationState = (
	userData: UserEventHistoryDataDto[],
	state: string
) => {
	return userData.filter(data => data.eventInvitation.state === state).length;
};

export const UserStatsCard = ({
	userData,
	title
}: {
	userData: UserEventHistoryDataDto[];
	title: string;
}) => {
	const totalEvents = userData.length;
	const acceptedInvitations = getStatsCountByInvitationState(
		userData,
		'Accepted'
	);
	const declinedInvitations = getStatsCountByInvitationState(
		userData,
		'Declined'
	);
	const notSureOrPendingInvitations =
		getStatsCountByInvitationState(userData, 'Not sure') +
		getStatsCountByInvitationState(userData, 'Pending');

	return (
		<Card className="my-2">
			<CardHeader>
				<h2 className="text-center text-2xl leading-tight font-extrabold text-gray-900">
					{title}
				</h2>
			</CardHeader>
			<CardContent>
				<CardLabeledItem label="Total invitations">
					<p className="text-base font-medium text-gray-700">{totalEvents}</p>
				</CardLabeledItem>
				<CardLabeledItem label="Accepted">
					<p className="text-base font-medium text-gray-700">
						{acceptedInvitations} (
						{totalEvents > 0
							? ((acceptedInvitations / totalEvents) * 100).toFixed(2)
							: '0.00'}
						%)
					</p>
				</CardLabeledItem>
				<CardLabeledItem label="Declined">
					<p className="text-base font-medium text-gray-700">
						{declinedInvitations} (
						{totalEvents > 0
							? ((declinedInvitations / totalEvents) * 100).toFixed(2)
							: '0.00'}
						%)
					</p>
				</CardLabeledItem>
				<CardLabeledItem label="Not sure or Pending">
					<p className="text-base font-medium text-gray-700">
						{notSureOrPendingInvitations} (
						{totalEvents > 0
							? ((notSureOrPendingInvitations / totalEvents) * 100).toFixed(2)
							: '0.00'}
						%)
					</p>
				</CardLabeledItem>
			</CardContent>
		</Card>
	);
};
