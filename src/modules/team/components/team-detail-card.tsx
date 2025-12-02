'use client';

import React from 'react';
import { TeamDetailDto } from '@/facades/team/schema';
import {
	Card,
	CardImage,
	CardLabeledItem,
	CardLinkList
} from '@/components/card';
import { Button } from '@/components/basic-components/button';
import { useLeaveTeam } from './hooks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const TeamDetailCard = ({
	team,
	amIAdmin
}: {
	team: TeamDetailDto;
	amIAdmin: boolean;
}) => {
	const defaultImageUrl =
		'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
	const imageUrl =
		team.imageUrl && team.imageUrl.length > 0 ? team.imageUrl : defaultImageUrl;
	const [amIMember, setAmIMember] = React.useState(true); // TODO: check properly
	const currentUserId = 'user_1_uuid'; // TODO: replace with actual current user ID
	const mutation = useLeaveTeam();
	const router = useRouter();

	const onLeaveTeam = () => {
		mutation.mutate(
			{ teamId: team.id, userId: currentUserId },
			{
				onSuccess: () => {
					toast.success('You have left the team successfully');
					setAmIMember(false);
					router.push(`/team/${team.id}`);
				},
				onError: error => {
					toast.error(`Failed to leave team: ${error.message}`);
				}
			}
		);
	};

	return (
		<>
			<Card
				showLinkFlag={amIAdmin}
				linkText="Edit Team"
				linkHref={`/team/edit/${team.id}`}
			>
				{amIMember && (
					<Button
						variant={'destructive'}
						className="absolute right-4 bottom-4"
						onClick={() => onLeaveTeam()}
					>
						Leave Team
					</Button>
				)}
				<CardImage imageUrl={imageUrl} />

				<CardLabeledItem label="Team Name">
					<p className="font-bold text-gray-600">{team.name}</p>
				</CardLabeledItem>

				<CardLabeledItem label="Organiser">
					<CardLinkList
						items={[
							{
								id: team.organizer.id,
								label: `${team.organizer.name} ${team.organizer.surname} (${team.organizer.nickname})`
							}
						]}
						href="/profile"
					/>
				</CardLabeledItem>

				<CardLabeledItem label="Members">
					<CardLinkList
						items={team.members.map(member => ({
							id: member.id,
							label: `${member.name} ${member.surname} (${member.nickname})`
						}))}
						href="/profile"
					/>
				</CardLabeledItem>
			</Card>
		</>
	);
};
