import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { CreateBoardItemForm } from '../../../modules/board/components/create-board-item-form';
import { eventService } from '@/services/event/service';
import { redirect } from 'next/navigation';

const CreateBoardItemPage = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		redirect('/');
	}

	try {
		const events = await eventService.getAllEvents();

		if (!events || events.length === 0) {
			throw new Error('No events found');
		}

		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-3xl font-semibold">Create Board Item</h1>
				<CreateBoardItemForm userId={session.user.id} events={events} />
			</div>
		);
	} catch (error) {
		throw new Error(`Failed to load events: ${error}`);
	}
};

export default CreateBoardItemPage;
