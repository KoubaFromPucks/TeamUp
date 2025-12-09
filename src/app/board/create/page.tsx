import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { CreateBoardItemForm } from '../../../modules/board/components/create-board-item-form';
import { eventService } from '@/services/event/service';
import { redirect } from 'next/navigation';
import type { EventListModel } from '@/services/event/schema';

type PageProps = {
	searchParams: Promise<{ eventId?: string }>;
};

const CreateBoardItemPage = async ({ searchParams }: PageProps) => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		redirect('/');
	}

	const { eventId } = await searchParams;

	try {
		const events = await eventService.getAllEvents();

		if (!events || events.length === 0) {
			throw new Error('No events found.');
		}

		const selectedEventId =
			eventId && events.some((e: EventListModel) => e.id === eventId)
				? eventId
				: events[0].id;

		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-3xl font-semibold">Create Board Item</h1>
				<CreateBoardItemForm
					userId={session.user.id}
					events={events}
					preselectedEventId={selectedEventId}
					redirectUrl={`/events/${selectedEventId}`}
				/>
			</div>
		);
	} catch (error) {
		throw new Error(`Failed to load events: ${error}`);
	}
};

export default CreateBoardItemPage;
