import { Card, CardContent } from '@/components/card/card';
import { CardImage, CardLabeledItem } from '@/components/card';
import { EventInvitationListDto } from '@/facades/event_invitation/schema';
import { getImageUrlOrDefault } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, HelpCircle } from 'lucide-react';
import React from 'react';

const stateConfig = {
	'Accepted': {
		icon: CheckCircle,
		className: 'text-green-600',
		label: 'Accepted'
	},
	'Declined': {
		icon: XCircle,
		className: 'text-red-600',
		label: 'Declined'
	},
	'Pending': {
		icon: Clock,
		className: 'text-yellow-600',
		label: 'Pending'
	},
	'Not sure': {
		icon: HelpCircle,
		className: 'text-gray-500',
		label: 'Not sure'
	}
} as const;

export const EventInvitationListCard = ({
	eventInvitation
}: {
	eventInvitation: EventInvitationListDto;
}) => {
	const user = eventInvitation.user;

	return (
		<div className="max-w-md hover:-translate-y-1">
			<Card>
				<CardContent className="gap-6">
					<div className="flex flex-col items-center gap-3">
						<CardImage
							imageUrl={getImageUrlOrDefault(user?.imageUrl)}
							size="medium"
						/>
						<div className="text-center">
							<p className="text-xl font-bold">{user?.name}</p>
							<p className="text-sm text-gray-500">@{user?.nickname}</p>
							<p className="text-sm text-gray-600">{user?.email}</p>
						</div>
					</div>

					<CardLabeledItem label="Invitation State">
						<InvitationStateItem state={eventInvitation.state} />
					</CardLabeledItem>
				</CardContent>
			</Card>
		</div>
	);
};

export const InvitationStateItem = ({
	state
}: {
	state: keyof typeof stateConfig;
}) => {
	const config = stateConfig[state];
	const Icon = config.icon;

	return (
		<div
			className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${config.className}`}
		>
			<Icon size={18} />
			{config.label}
		</div>
	);
};
