'use client';

import React, { useEffect, useState } from 'react';
import { UserDetailDto } from '@/facades/user/schema';
import {
	Card,
	CardImage,
	CardLabeledItem,
	CardLinkList
} from '@/components/card';
import { CardContent, CardHeader } from '@/components/card/card';
import { StandardLink } from '@/components/standard-link';
import { useRouter } from 'next/navigation';
import { TeamListDto } from '@/facades/team/schema';
import { getImageUrlOrDefault } from '@/lib/utils';
import { useSession } from '@/lib/auth-client';
import { RemoveTeamDialog } from './remove-team-dialog';

export const UserCard = ({ user }: { user: UserDetailDto }) => {
	const router = useRouter();
	const { data: session } = useSession();

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const isItLoggedUserProfile = isMounted && session?.user?.id === user.id;

	return (
		<>
			<Card>
				{isItLoggedUserProfile && (
					<CardHeader>
						<StandardLink href={`/profile/edit`}>Edit Profile</StandardLink>
					</CardHeader>
				)}
				<CardContent>
					<CardImage imageUrl={getImageUrlOrDefault(user.imageUrl)} />
					<CardLabeledItem label="User informations">
						<h2 className="text-xl font-bold">{user.name}</h2>
						<p className="text-gray-600">@{user.nickname}</p>
						<p className="text-gray-600">{user.email}</p>
						<p className="text-gray-600">{user.phoneNumber}</p>
					</CardLabeledItem>

					<CardLabeledItem label="Admined Teams">
						<CardLinkList
							href="/team"
							additionalContent={
								isItLoggedUserProfile && (
									<StandardLink
										className="block w-full"
										variant="dark"
										href="/team/create"
									>
										Create team
									</StandardLink>
								)
							}
						>
							{user.adminedTeams.map(team => (
								<TeamListItem
									key={team.id}
									team={team}
									onRemove={
										isItLoggedUserProfile
											? () => {
													router.push(`/profile/${user.id}`);
												}
											: undefined
									}
								/>
							))}
							{user.adminedTeams.length === 0 && (
								<p className="text-gray-600">User has no teams</p>
							)}
						</CardLinkList>
					</CardLabeledItem>

					<CardLabeledItem label="Membered Teams">
						<CardLinkList>
							{user.memberTeams.map(team => (
								<TeamListItem key={team.id} team={team} />
							))}
							{user.memberTeams.length === 0 && (
								<p className="text-gray-600">User is not member of any team</p>
							)}
						</CardLinkList>
					</CardLabeledItem>
				</CardContent>
			</Card>
		</>
	);
};

const TeamListItem = ({
	team,
	onRemove
}: {
	team: TeamListDto;
	onRemove?: (teamId: string) => void;
}) => (
	<li key={team.id} className="flex w-full items-center text-black">
		<StandardLink
			href={`/team/${team.id}`}
			className="mx-0 block h-auto w-full"
		>
			<div className="flex items-center gap-2">
				<CardImage
					imageUrl={getImageUrlOrDefault(team.imageUrl)}
					size="small"
				/>
				{team.name}
			</div>
		</StandardLink>

		{onRemove && (
			<RemoveTeamDialog
				teamId={team.id}
				teamName={team.name}
				onRemove={() => onRemove(team.id)}
			/>
		)}
	</li>
);
