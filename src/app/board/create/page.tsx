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
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-3xl font-semibold">Create Board Item</h1>
				<p className="text-red-500">
					Failed to load events. Please try again later.
				</p>
			</div>
		);
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
