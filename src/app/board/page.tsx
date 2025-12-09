import {
	getBoardItemsForUser,
	canUserModifyBoardItem
} from '@/facades/board/board-item-facade';
import React from 'react';
import type { BoardItemListDto } from '@/facades/board/schema';
import Link from 'next/link';
import { Button } from '@/components/basic-components/button';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Plus } from 'lucide-react';
import { BoardItemCard } from '@/modules/board/components/board-item-card';

const BoardPage = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		redirect('/');
	}

	const { error, boardItems } = await getBoardItemsForUser(session.user.id);

	if (error || !boardItems) {
		throw new Error(`Failed to load board items: ${error}`);
	}

	const boardItemsWithAuth = await Promise.all(
		boardItems.map(async (item: BoardItemListDto) => {
			const { canModify } = await canUserModifyBoardItem(
				item.id,
				session.user.id
			);
			return { ...item, canUserModify: canModify };
		})
	);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-10 flex items-center justify-between">
				<h1 className="mb-2 text-4xl font-bold tracking-tight">Board</h1>
				<Button asChild>
					<Link href="/board/create">
						<Plus className="h-4 w-4" />
						Create Board Item
					</Link>
				</Button>
			</div>

			{boardItems.length === 0 ? (
				<div className="flex min-h-[400px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
					<div className="text-center">
						<p className="text-xl font-medium text-gray-500">
							No board items yet
						</p>
						<p className="mt-2 text-sm text-gray-400">
							Check back later for new posts
						</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{boardItemsWithAuth.map((item: BoardItemListDto) => (
						<BoardItemCard
							key={item.id}
							item={item}
							showEvent={true}
							showActions={true}
							canUserModify={item.canUserModify}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default BoardPage;
