import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { CreateBoardItemForm } from '../../../modules/board/components/create-board-item-form';
import { getAllConcreteEvents } from '@/facades/concrete_event/concrete-event-facade';
import { redirect } from 'next/navigation';

const CreateBoardItemPage = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		redirect('/');
	}

	const { concreteEvent: concreteEvents, error } = await getAllConcreteEvents();

	if (error || !concreteEvents) {
		throw new Error(`Failed to load concrete events: ${error}`);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-3xl font-semibold">Create Board Item</h1>
			<CreateBoardItemForm
				userId={session.user.id}
				concreteEvents={concreteEvents}
			/>
		</div>
	);
};

export default CreateBoardItemPage;
