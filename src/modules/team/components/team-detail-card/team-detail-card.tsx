'use client';

import React from 'react';
import { TeamDetailDto } from '@/facades/team/schema';
import {
	Card,
	CardImage,
	CardLabeledItem,
	CardLinkList
} from '@/components/card';
import { X } from 'lucide-react';
import { useRemoveTeamMutation, useRemoveUserFromTeamMutation } from './hooks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { StandardLink } from '@/components/standard-link';
import { AddTeamMemberDialog } from './add-team-member-dialog';
import { CardContent, CardFooter, CardHeader } from '@/components/card/card';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { getImageUrlOrDefault } from '@/lib/utils';
import { useSession } from '@/lib/auth-client';

export const TeamDetailCard = ({ team }: { team: TeamDetailDto }) => {
	const { data: session } = useSession();
	const mutation = useRemoveUserFromTeamMutation();
	const removeTeamMutation = useRemoveTeamMutation();
	const router = useRouter();
	const currentUserId = session?.user?.id || '';
	const [isUserMember, setIsUserMember] = React.useState(
		team.members.some(member => member.id === currentUserId)
	);
	const isUserAdmin = session?.user?.id === team.organizerId;

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

	const onRemoveTeam = () => {
		removeTeamMutation.mutate(
			{ teamId: team.id },
			{
				onSuccess: () => {
					toast.success('Team has been deleted successfully');
					router.push(`/profile/${currentUserId}`);
				},
				onError: error => {
					toast.error(`Failed to delete team: ${error.message}`);
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
							Edit Team Info
						</StandardLink>
					</CardHeader>
				)}
				<CardContent>
					<CardImage imageUrl={getImageUrlOrDefault(team.imageUrl)} />

					<CardLabeledItem label="Team Information">
						<p className="font-bold text-gray-600">{team.name}</p>
						<p className="text-gray-500">{team.desc}</p>
					</CardLabeledItem>

					<CardLabeledItem label="Organiser">
						<CardLinkList
							items={[
								{
									id: team.organizer.id,
									label: `${team.organizer.name} (${team.organizer.nickname})`
								}
							]}
							href="/profile"
						/>
					</CardLabeledItem>

					<CardLabeledItem label="Members">
						<CardLinkList
							href="/profile"
							additionalContent={
								isUserAdmin && (
									<AddTeamMemberDialog
										teamId={team.id}
										onSuccess={() => router.push(`/team/${team.id}`)}
									/>
								)
							}
						>
							{team.members.map(member => (
								<li key={member.id} className="flex w-full text-black">
									<StandardLink
										href={`/profile/${member.id}`}
										className="mx-0 block w-full"
									>
										{`${member.name} (${member.nickname})`}
									</StandardLink>
									{isUserAdmin && (
										<ConfirmDialog
											onConfirm={() => onRemoveMember(member.id)}
											question={`Are you sure you want to remove ${member.name} (${member.nickname}) from team?`}
											triggerContent={<X />}
										/>
									)}
								</li>
							))}
						</CardLinkList>
					</CardLabeledItem>
				</CardContent>

				{(isUserMember || isUserAdmin) && (
					<CardFooter>
						{isUserMember && (
							<ConfirmDialog
								onConfirm={onLeaveTeam}
								question="Are you sure you want to leave the team?"
								triggerContent="Leave Team"
							/>
						)}
						{isUserAdmin && (
							<ConfirmDialog
								onConfirm={() => onRemoveTeam()}
								question="Are you sure you want to remove yourself from the team?"
								triggerContent="Delete Team"
							/>
						)}
					</CardFooter>
				)}
			</Card>
		</>
	);
};
