'use client';

import React from 'react';
import { UserDetailDto } from '@/facades/user/schema';
import { X } from 'lucide-react';
import {
	Card,
	CardImage,
	CardLabeledItem,
	CardLinkList
} from '@/components/card';
import { CardContent, CardHeader } from '@/components/card/card';
import { StandardLink } from '@/components/standard-link';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { useRemoveTeamMutation } from './hooks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const UserCard = ({
	user,
	myProfile
}: {
	user: UserDetailDto;
	myProfile: boolean;
}) => {
	const defaultImageUrl =
		'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
	const imageUrl =
		user.imageUrl && user.imageUrl.length > 0 ? user.imageUrl : defaultImageUrl;

	const router = useRouter();

	const removeTeamMutation = useRemoveTeamMutation();
	const onRemoveTeam = (teamId: string) => {
		removeTeamMutation.mutate(
			{ teamId: teamId },
			{
				onSuccess: () => {
					toast.success('Team has been deleted successfully');
					router.push(`/profile/${user.id}`);
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
				{myProfile && (
					<CardHeader>
						<StandardLink href={`/profile/edit`}>Edit Profile</StandardLink>
					</CardHeader>
				)}
				<CardContent>
					<CardImage imageUrl={imageUrl} />
					<CardLabeledItem label="User informations">
						<h2 className="text-xl font-bold">
							{user.name} {user.surname}
						</h2>
						<p className="text-gray-600">@{user.nickname}</p>
						<p className="text-gray-600">{user.email}</p>
						<p className="text-gray-600">{user.phoneNumber}</p>
					</CardLabeledItem>

					<CardLabeledItem label="Admined Teams">
						<CardLinkList
							href="/team"
							additionalContent={
								<StandardLink
									className="block w-full"
									variant="dark"
									href="/team/create"
								>
									Create team
								</StandardLink>
							}
						>
							{user.adminedTeams.map(team => (
								<li key={team.id} className="flex w-full text-black">
									<StandardLink
										href={`/team/${team.id}`}
										className="mx-0 block w-full"
									>
										{team.name}
									</StandardLink>

									<ConfirmDialog
										onConfirm={() => onRemoveTeam(team.id)}
										question={`Are you sure you want to remove the team "${team.name}"?`}
										triggerContent={<X />}
									/>
								</li>
							))}
						</CardLinkList>
					</CardLabeledItem>

					<CardLabeledItem label="Membered Teams">
						<CardLinkList
							href="/team"
							items={user.memberTeams.map(team => ({
								id: team.id,
								label: team.name
							}))}
						/>
					</CardLabeledItem>
				</CardContent>
			</Card>
		</>
	);
};
