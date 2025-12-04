import React from 'react';
import { getUserById } from '@/facades/user/user-facade';
import { UpdateUserForm } from '@/modules/user/components/update-user-form';
import { ChevronLeft } from 'lucide-react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const Page = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) {
		throw new Error('You must be logged in to edit profile');
	}

	const { error, user } = await getUserById(session.user.id);
	const returnPath = `/profile/${user?.id}`;

	if (!user || error) {
		throw new Error('User to edit was not found');
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
