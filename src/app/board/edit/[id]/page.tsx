import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getBoardItemById } from '@/facades/board/board-item-facade';
import { getAllConcreteEvents } from '@/facades/concrete_event/concrete-event-facade';
import { EditBoardItemForm } from '../../../../modules/board/components/edit-board-item-form';

type PageProps = {
	params: Promise<{ id: string }>;
};

const EditBoardItemPage = async ({ params }: PageProps) => {
	const { id } = await params;
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		redirect('/');
	}

	const { boardItem, error: boardItemError } = await getBoardItemById(id);

	if (boardItemError || !boardItem) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-3xl font-semibold">Edit Board Item</h1>
				<p className="text-red-500">Board item not found.</p>
			</div>
		);
	}

	const { concreteEvent: concreteEvents, error: eventsError } =
		await getAllConcreteEvents();

	if (eventsError || !concreteEvents) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-3xl font-semibold">Edit Board Item</h1>
				<p className="text-red-500">
					Failed to load events. Please try again later.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-3xl font-semibold">Edit Board Item</h1>
			<EditBoardItemForm
				boardItem={boardItem}
				concreteEvents={concreteEvents}
			/>
		</div>
	);
};

export default EditBoardItemPage;
