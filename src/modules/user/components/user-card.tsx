import { StandardLink } from '@/components/standard-link';
import { UserDetailDto } from '@/facades/user/schema';
import React from 'react';
import { UserImage } from './user-image';

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

	return (
		<>
			<div className="relative flex flex-col items-center rounded-lg border p-4 shadow lg:flex-row lg:items-center lg:justify-evenly">
				{myProfile && (
					<StandardLink
						className="absolute top-4 right-4"
						href={`/profile/edit`}
					>
						Edit Profile
					</StandardLink>
				)}
				<UserImage imageUrl={imageUrl} />
				<div className="text-center lg:text-left">
					<h2 className="text-xl font-bold">
						{user.name} {user.surname}
					</h2>
					<p className="text-gray-600">@{user.nickname}</p>
					<p className="text-gray-600">{user.email}</p>
					<p className="text-gray-600">{user.phoneNumber}</p>
				</div>
				<div>{teamList(user.adminedTeams, 'Admined Teams')}</div>
				<div>{teamList(user.memberTeams, 'Membered Teams')}</div>
			</div>
		</>
	);
};

const teamList = (teams: { id: string; name: string }[], title: string) => (
	<>
		<h2 className="mb-2 text-xl font-bold">{title}</h2>
		{teams?.length === 0 ? (
			<p className="text-gray-600">No teams</p>
		) : (
			<>
				<hr className="mb-2 border-black" />
				<ul>{teams?.map(teamItem)}</ul>
			</>
		)}
	</>
);

const teamItem = (team: { id: string; name: string }) => (
	<li key={team.id} className="w-full text-black">
		<StandardLink href="#" className="mx-0 block w-full">
			{team.name}
		</StandardLink>
		{
			// TODO link to team page
		}
	</li>
);
