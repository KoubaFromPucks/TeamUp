import { StandardLink } from '@/components/standard-link';;
import {
	getConcreteEventById,
	isUserEventsOrganizer
} from '@/facades/concrete_event/concrete-event-facade';
import { auth } from '@/lib/auth';
import { ConcreteEventCard } from '@/modules/concreteEvent/components/concrete-event-card';
import { EventInvitationListCard } from '@/modules/EventInvitation/components/event-invitation-list-card';
import { headers } from 'next/headers';
import React from 'react';

type PageProps = {
	params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
	const { id } = await params;
	const { error, concreteEvent } = await getConcreteEventById(id);

	if (!concreteEvent || error) {
		throw new Error('error fetching concrete events');
	}

	const session = await auth.api.getSession({
		headers: await headers()
	});

	const userId = session?.user?.id;

	let showInviteButton = false;
	if (userId) {
		const { isOrganiser } = await isUserEventsOrganizer(
			concreteEvent.eventId,
			userId
		);
		showInviteButton = !!isOrganiser;
	}

	return (
		<div>
			<ConcreteEventCard
				concreteEvent={concreteEvent}
				isDetail={true}
			></ConcreteEventCard>
			<div className="mt-2 mb-2 flex justify-between">
				<h1 className="text-lg font-semibold">Invited users</h1>
				{showInviteButton && (
					<StandardLink href={`/concreteEvent/${id}/invite`}>
						Invite users
					</StandardLink>
				)}
			</div>

			<div className="flex flex-wrap gap-6">
				{concreteEvent.invitedUsers.map(c => (
					<EventInvitationListCard eventInvitation={c} key={c.id} />
				))}
			</div>
		</div>
	);
};

export default Page;
