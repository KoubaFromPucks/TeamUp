import React from 'react';
import { getUserById } from '@/facades/user/user-facade';
import { UpdateUserForm } from '@/modules/user/components/update-user-form';
import { ChevronLeft } from 'lucide-react';
import { CircleOff } from 'lucide-react';

const Page = async () => {
	const { error, user } = await getUserById(
		'fc06e91f-d36b-41ff-a42f-be1be694ec83'
	); // TODO: replace with actual user ID
	const returnPath = `/profile/${user?.id}`;

	if (!user || error) {
		return (
			<h1 className="text-destructive flex items-center text-3xl font-bold">
				{error ?? 'User not found'}
				<CircleOff className="mx-3 mr-2 h-10 w-10" />
			</h1>
		);
	}

	return (
		<>
			<div className="mb-6 flex items-center">
				<a href={returnPath}>
					<ChevronLeft className="h-7 w-7 cursor-pointer" />
				</a>
				<h1 className="text-3xl font-semibold">Edit User Profile</h1>
			</div>
			<UpdateUserForm user={{ ...user }} navPath={returnPath} />
		</>
	);
};

export default Page;
