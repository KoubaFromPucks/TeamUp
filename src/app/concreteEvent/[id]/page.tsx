import { StandardLink } from '@/components/standard-link';
import { getConcreteEventById } from '@/facades/concrete_event/concrete-event-facade';
import { ConcreteEventCard } from '@/modules/concreteEvent/components/concrete-event-card';
import { EventInvitationListCard } from '@/modules/EventInvitation/components/event-invitation-list-card';
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

	console.log(concreteEvent);

	return (
		<div>
			<ConcreteEventCard
				concreteEvent={concreteEvent}
				isDetail={true}
			></ConcreteEventCard>
			<div className="mt-2 mb-2 flex justify-between">
				<h1 className="text-lg font-semibold">ivited users</h1>
				<StandardLink href={'/invite/create'}>invite users</StandardLink>
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
