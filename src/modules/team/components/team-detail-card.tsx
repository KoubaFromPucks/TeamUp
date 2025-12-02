import { StandardLink } from '@/components/standard-link';
import React from 'react';
import { CardImage } from '@/components/card-image';
import { TeamDetailDto } from '@/facades/team/schema';
import { UserListDto } from '@/facades/user/schema';
import { CardLabeledItem } from '@/components/card-labeled-Item';

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
			<div className="relative flex flex-col items-center rounded-lg border p-4 shadow lg:flex-row lg:justify-evenly">
				{amIAdmin && (
					<StandardLink
						className="absolute top-4 right-4"
						href={`/team/edit/${team.id}`}
					>
						Edit Team
					</StandardLink>
				)}

				<CardImage imageUrl={imageUrl} />

				<CardLabeledItem label="Team Name">
					<p className="font-bold text-gray-600">{team.name}</p>
				</CardLabeledItem>

				<CardLabeledItem label="Organiser">
					<MemberLink member={team.organizer} />
				</CardLabeledItem>

				<CardLabeledItem label="Members">
					<MemberList members={team.members} />
				</CardLabeledItem>
			</div>
		</>
	);
};

const MemberList = ({
	members,
	additionalContent
}: {
	members: UserListDto[];
	additionalContent?: React.ReactNode;
}) => (
	<>
		{members?.length === 0 ? (
			<p className="text-gray-600">No members</p>
		) : (
			<>
				<ul>
					{members
						?.toSorted((a, b) => a.name.localeCompare(b.name))
						.map(member => (
							<MemberItem key={member.id} member={member} />
						))}
				</ul>
			</>
		)}
		{additionalContent}
	</>
);

const MemberItem = ({ member }: { member: UserListDto }) => (
	<li key={member.id} className="w-full text-black">
		<MemberLink member={member} />
	</li>
);

const MemberLink = ({ member }: { member: UserListDto }) => (
	<StandardLink href={`/profile/${member.id}`} className="block">
		{member.name} {member.surname} ({member.nickname})
	</StandardLink>
);
