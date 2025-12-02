import React from 'react';
import { StandardLink } from '@/components/standard-link';
import { UserDetailDto } from '@/facades/user/schema';
import { Button } from '@/components/basic-components/button';
import { Card, CardImage, CardLabeledItem } from '@/components/card';

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

	// TODO Create team button should redirect to team creation page
	return (
		<>
			<Card
				showLinkFlag={myProfile}
				linkText="Edit Profile"
				linkHref="/profile/edit"
			>
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
					<TeamList
						teams={user.adminedTeams}
						additionalContent={<Button className="w-full">Create team</Button>}
					/>
				</CardLabeledItem>

				<CardLabeledItem label="Membered Teams">
					<TeamList teams={user.memberTeams} />
				</CardLabeledItem>
			</Card>
		</>
	);
};

const TeamList = ({
	teams,
	additionalContent
}: {
	teams: { id: string; name: string }[];
	additionalContent?: React.ReactNode;
}) => (
	<>
		{teams?.length === 0 ? (
			<p className="text-gray-600">No teams</p>
		) : (
			<>
				<ul>
					{teams
						?.toSorted((a, b) => a.name.localeCompare(b.name))
						.map(TeamItem)}
				</ul>
			</>
		)}
		{additionalContent}
	</>
);

const TeamItem = (team: { id: string; name: string }) => (
	<li key={team.id} className="w-full text-black">
		<StandardLink href="#" className="mx-0 block w-full">
			{team.name}
		</StandardLink>
		{
			// TODO link to team page
		}
	</li>
);
