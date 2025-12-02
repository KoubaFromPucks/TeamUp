import React from 'react';
import { TeamDetailDto } from '@/facades/team/schema';
import { Card, CardImage, CardLabeledItem, CardList } from '@/components/card';

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

	return (
		<>
			<Card
				showLinkFlag={amIAdmin}
				linkText="Edit Team"
				linkHref={`/team/edit/${team.id}`}
			>
				<CardImage imageUrl={imageUrl} />

				<CardLabeledItem label="Team Name">
					<p className="font-bold text-gray-600">{team.name}</p>
				</CardLabeledItem>

				<CardLabeledItem label="Organiser">
					<CardList
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
					<CardList
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
