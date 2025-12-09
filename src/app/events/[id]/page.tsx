import { StandardLink } from '@/components/standard-link';
import { getEventById } from '@/facades/event/event-facade';
import { getInvitedEventIdsForUser } from '@/facades/event/helper';
import { ConcreteEventCard } from '@/modules/concreteEvent/components/concrete-event-card';
import React from 'react';
import { EventDetailCard } from '@/modules/event/components/event-detail-card';
import { getEventPermissions } from '@/modules/event/utils/permissions';
import { VenueCard } from '@/modules/venue/components/venue-card';
import { getVenueById } from '@/facades/venue/venue-facade';
import { authService } from '@/services/auth/auth-service';
import { CreateEventCard } from '@/modules/event/components/create-event-card';
import { BoardItemCard } from '@/modules/board/components/board-item-card';
import { CoorganisersCard } from '@/modules/event/components/coorganisers/coorganisers-card';

type PageProps = {
	params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
	const { id } = await params;

	const sessionUser = await authService.getLoggedUserOrNull();
	const userId = sessionUser?.id ?? null;

	const { error, event } = await getEventById(id);

	if (!event || error) {
		throw new Error(
			'Error fetching event data. Either event does not exist or ther was an error: ' +
				(error ?? '')
		);
	}

	const invitedEventIds = userId
		? await getInvitedEventIdsForUser(userId)
		: new Set<string>();

	const { canSee, canManage, isOwner } = await getEventPermissions({
		event,
		userId,
		invitedEventIds
	});

	const { venue } = await getVenueById(event.venueId);

	if (!canSee) {
		throw new Error('You are not allowed to view this event.');
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
				<div className="lg:w-2/3">
					<div className="h-full min-h-[180px]">
						<EventDetailCard event={event} canManage={canManage} />
					</div>
				</div>

				{venue && (
					<div className="lg:w-1/3">
						<VenueCard venue={venue} isDetail={false} />
					</div>
				)}
			</div>

			<div className="mt-6 mb-2 flex justify-between">
				<h1 className="text-lg font-semibold">Board items</h1>

				{canManage && (
					<StandardLink href={`/board/create?eventId=${event.id}`}>
						create board item
					</StandardLink>
				)}
			</div>

			<div className="grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
				{event.boardItems.length === 0 ? (
					<p className="text-gray-500">No items</p>
				) : (
					event.boardItems.map(b => (
						<BoardItemCard
							key={b.id}
							item={b}
							showEvent={false}
							showActions={true}
							canUserModify={canManage}
						/>
					))
				)}
			</div>

			<div className="flex flex-wrap gap-6">
				{canManage && (
					<CreateEventCard
						label="Create concrete event"
						href={`/concreteEvent/create/${id}`}
					></CreateEventCard>
				)}
				{event.concreteEvents.length === 0 ? (
					<p className="text-gray-500">No concrete events</p>
				) : (
					event.concreteEvents.map(ce => (
						<div className="w-100" key={ce.id}>
							<ConcreteEventCard
								concreteEvent={ce}
								isDetail={false}
								pricePerPerson={undefined}
							/>
						</div>
					))
				)}
			</div>

			{isOwner && (
				<CoorganisersCard
					eventId={event.id}
					coorganisers={event.coorganisers}
					canManage={isOwner}
				/>
			)}
		</div>
	);
};

export default Page;
