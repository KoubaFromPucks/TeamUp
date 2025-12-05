'use client';

import React from 'react';
import { TeamDetailDto } from '@/facades/team/schema';
import {
	Card,
	CardImage,
	CardLabeledItem,
	CardLinkList
} from '@/components/card';
import { useRouter } from 'next/navigation';
import { StandardLink } from '@/components/standard-link';
import { AddTeamMemberDialog } from './dialogs/add-team-member-dialog';
import { CardContent, CardFooter, CardHeader } from '@/components/card/card';
import { getImageUrlOrDefault } from '@/lib/utils';
import { useSession } from '@/lib/auth-client';
import { RemoveMemberDialog } from './dialogs/remove-member-dialog';
import { LeaveTeamDialog } from './dialogs/leave-team-dialog';
import { RemoveTeamDialog } from './dialogs/remove-team-dialog';
import { useState, useEffect } from 'react';

export const TeamDetailCard = ({ team }: { team: TeamDetailDto }) => {
	const { data: session } = useSession();

	const router = useRouter();
	const currentUserId = session?.user?.id || '';

	const [isUserMember, setIsUserMember] = useState(
		team.members.some(member => member.id === currentUserId)
	);

	useEffect(() => {
		setIsUserMember(team.members.some(member => member.id === currentUserId));
	}, [currentUserId]);

	const isUserAdmin = session?.user?.id === team.organizerId;

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
							href="/user"
						/>
					</CardLabeledItem>

					<CardLabeledItem label="Members">
						<CardLinkList
							href="/user"
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
										href={`/user/${member.id}`}
										className="mx-0 block w-full"
									>
										{`${member.name} (${member.nickname})`}
									</StandardLink>
									{isUserAdmin && (
										<RemoveMemberDialog
											member={member}
											teamId={team.id}
											onRemove={() => router.push(`/team/${team.id}`)}
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
							<LeaveTeamDialog
								teamId={team.id}
								userId={currentUserId}
								onLeave={() => {
									setIsUserMember(false);
									router.push(`/user/${currentUserId}`);
								}}
							/>
						)}
						{isUserAdmin && (
							<RemoveTeamDialog
								teamId={team.id}
								onRemove={() => router.push(`/user/${currentUserId}`)}
							/>
						)}
					</CardFooter>
				)}
			</Card>
		</>
	);
};
