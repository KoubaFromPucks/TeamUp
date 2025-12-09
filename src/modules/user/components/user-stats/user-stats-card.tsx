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
				<StatsItem
					label="Total invitations"
					totalCount={totalEvents}
					categoryCount={totalEvents}
					showPercentage={false}
				/>

				<StatsItem
					label="Accepted"
					totalCount={totalEvents}
					categoryCount={acceptedInvitations}
				/>

				<StatsItem
					label="Declined"
					totalCount={totalEvents}
					categoryCount={declinedInvitations}
				/>

				<StatsItem
					label="Not sure or Pending"
					totalCount={totalEvents}
					categoryCount={notSureOrPendingInvitations}
				/>
			</CardContent>
		</Card>
	);
};

const bracketPercentage = (percentage: string) => ` (${percentage} %)`;

const StatsItem = ({
	label,
	totalCount,
	categoryCount,
	showPercentage = true
}: {
	label: string;
	totalCount: number;
	categoryCount: number;
	showPercentage?: boolean;
}) => (
	<CardLabeledItem label={label}>
		<p className="text-base font-medium text-gray-700">
			{categoryCount}
			{showPercentage &&
				(totalCount > 0
					? bracketPercentage(((categoryCount / totalCount) * 100).toFixed(2))
					: bracketPercentage('0.00'))}
		</p>
	</CardLabeledItem>
);
