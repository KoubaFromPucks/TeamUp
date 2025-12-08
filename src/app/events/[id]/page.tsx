import { StandardLink } from '@/components/standard-link';
import { getEventById } from '@/facades/event/event-facade';
import { getInvitedEventIdsForUser } from '@/facades/event/helper';
import { ConcreteEventCard } from '@/modules/concreteEvent/components/concrete-event-card';
import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { DeleteEventButton } from '@/modules/event/components/delete-event-button/delete-event-button';
import { EventDetailCard } from '@/modules/event/components/event-detail-card';
import { getEventPermissions } from '@/modules/event/utils/permissions';

type PageProps = {
	params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
	const { id } = await params;

	const session = await auth.api.getSession({
		headers: await headers()
	});
	const userId = session?.user?.id ?? null;

	const { error, event } = await getEventById(id);

	if (!event || error) {
		throw new Error('error fetching event');
	}

	const invitedEventIds = userId
		? await getInvitedEventIdsForUser(userId)
		: new Set<string>();

	const { canSee, canManage } = getEventPermissions({
		event,
		userId,
		invitedEventIds
	});

	if (!canSee) {
		throw new Error('not allowed');
	}


	return (
		<div>
			<EventDetailCard event={event} canManage={canManage} />

			<div className="flex flex-wrap gap-6">
				{event.boardItems.length === 0 ? (
					<p className="text-gray-500">No items</p>
				) : (
					event.boardItems.map(b => (
						<div className="w-100" key={b.id}>
							<div className="rounded-lg border p-4 shadow">
								<h3 className="font-semibold">{b.title}</h3>
								<p className="text-gray-600">{b.content}</p>
							</div>
						</div>
					))
				)}
			</div>

			<div className="flex mb-2 mt-6 justify-between">
				<h1 className="text-lg font-semibold">Concrete events</h1>
				{canManage && (
					<StandardLink href={`/concreteEvent/create?eventId=${event.id}`}>
						create concrete event
					</StandardLink>
				)}
			</div>

			<div className="flex flex-wrap gap-6">
				{event.concreteEvents.length === 0 ? (
					<p className="text-gray-500">No concrete events</p>
				) : (
					event.concreteEvents.map(ce => (
						<div className="w-100" key={ce.id}>
							<ConcreteEventCard concreteEvent={ce} isDetail={false} />
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Page;
