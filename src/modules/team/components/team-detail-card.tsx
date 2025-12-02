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
import { useRemoveUserFromTeamMutation } from './hooks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { StandardLink } from '@/components/standard-link';
import { AddTeamMemberDialog } from './add-team-member-dialog';
import { CardContent, CardFooter, CardHeader } from '@/components/card/card';

export const TeamDetailCard = ({
	team,
	isUserAdmin
}: {
	team: TeamDetailDto;
	isUserAdmin: boolean;
}) => {
	const defaultImageUrl =
		'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
	const imageUrl =
		team.imageUrl && team.imageUrl.length > 0 ? team.imageUrl : defaultImageUrl;
	const [isUserMember, setIsUserMember] = React.useState(true); // TODO: check properly
	const currentUserId = '4475cadc-4a81-4f50-8560-d1c8f3ea7bab'; // TODO: replace with actual current user ID
	const mutation = useRemoveUserFromTeamMutation();
	const router = useRouter();

	const onLeaveTeam = () => {
		mutation.mutate(
			{ teamId: team.id, userId: currentUserId },
			{
				onSuccess: () => {
					toast.success('You have left the team successfully');
					setIsUserMember(false);
					router.push(`/team/${team.id}`);
				},
				onError: error => {
					toast.error(`Failed to leave team: ${error.message}`);
				}
			}
		);
	};

	// TODO refaktorovat
	const onRemoveMember = (userId: string) => {
		mutation.mutate(
			{ teamId: team.id, userId: userId },
			{
				onSuccess: () => {
					toast.success('Member has been removed from the team successfully');
					router.push(`/team/${team.id}`);
				},
				onError: error => {
					toast.error(`Failed to remove member: ${error.message}`);
				}
			}
		);
	};

	return (
		<>
			<Card>
				{isUserAdmin && (
					<CardHeader>
						<StandardLink href={`/team/${team.id}/edit`}>
							Update Team Info
						</StandardLink>
					</CardHeader>
				)}
				<CardContent>
					<CardImage imageUrl={imageUrl} />

					<CardLabeledItem label="Team Information">
						<p className="font-bold text-gray-600">{team.name}</p>
						<p className="text-gray-500">{team.desc}</p>
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
							href="/profile"
							additionalContent={
								<AddTeamMemberDialog
									teamId={team.id}
									onSuccess={() => router.push(`/team/${team.id}`)}
								/>
							}
						>
							{team.members.map(member => (
								<li key={member.id} className="flex w-full text-black">
									<StandardLink
										href={`/profile/${member.id}`}
										className="mx-0 block w-full"
									>
										{`${member.name} ${member.surname} (${member.nickname})`}
									</StandardLink>
									{isUserAdmin && (
										<Button
											variant="destructive"
											className="ml-2"
											onClick={() => onRemoveMember(member.id)}
										>
											X
										</Button>
									)}
								</li>
							))}
						</CardLinkList>
					</CardLabeledItem>
				</CardContent>

				{isUserMember && (
					<CardFooter>
						<Button variant={'destructive'} onClick={() => onLeaveTeam()}>
							Leave Team
						</Button>
					</CardFooter>
				)}
			</Card>
		</>
	);
};
