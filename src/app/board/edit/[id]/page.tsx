import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
	getBoardItemById,
	canUserModifyBoardItem
} from '@/facades/board/board-item-facade';
import { eventService } from '@/services/event/service';
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
		throw new Error(`Failed to load board item: ${boardItemError}`);
	}

	const { canModify } = await canUserModifyBoardItem(id, session.user.id);

	if (!canModify) {
		redirect('/board');
	}

	try {
		const events = await eventService.getAllEvents();

		if (!events) {
			throw new Error('Failed to load events');
		}

		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-3xl font-semibold">Edit Board Item</h1>
				<EditBoardItemForm boardItem={boardItem} events={events} />
			</div>
		);
	} catch (error) {
		throw new Error(`Failed to load events: ${error}`);
	}
};

export default EditBoardItemPage;
