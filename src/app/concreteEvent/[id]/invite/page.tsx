import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
	getConcreteEventById,
	isUserEventsOrganizer
} from '@/facades/concrete_event/concrete-event-facade';
import { getAllUsers } from '@/facades/user/user-facade';
import { InviteUsersView } from '@/modules/invitation/invite-users-view';
import React from 'react';

type PageProps = {
	params: Promise<{ id: string }>;
};

const InvitePage = async ({ params }: PageProps) => {
	const { id } = await params;

	const session = await auth.api.getSession({
		headers: await headers()
	});

	if (!session?.user?.id) {
		redirect('/');
	}

	const { error, concreteEvent } = await getConcreteEventById(id);

	if (!concreteEvent || error) {
		throw new Error('Concrete event not found');
	}

	const { isOrganiser } = await isUserEventsOrganizer(id, session.user.id);

	if (!isOrganiser) {
		redirect(`/concreteEvent/${id}`);
	}

	const { users, error: usersError } = await getAllUsers();

	if (usersError || !users) {
		throw new Error('Failed to load users');
	}

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Invite Users</h1>
				<p className="mt-2 text-gray-600">
					Manage invitations for "{concreteEvent.eventName}"
				</p>
			</div>

			<InviteUsersView
				concreteEventId={id}
				allUsers={users}
				invitedUsers={concreteEvent.invitedUsers}
			/>
		</div>
	);
};

export default InvitePage;
