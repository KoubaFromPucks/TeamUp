import { getAllBoardItems } from '@/facades/board/board-item-facade';
import { Card, CardContent, CardHeader } from '@/components/card';
import { Calendar, User } from 'lucide-react';
import React from 'react';
import type { BoardItemListDto } from '@/facades/board/schema';

const BoardPage = async () => {
	const { error, boardItems } = await getAllBoardItems();

	if (error || !boardItems) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-3xl font-semibold">Board</h1>
				<p className="text-red-500">Failed to load board items: {error}</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-10">
				<h1 className="mb-2 text-4xl font-bold tracking-tight">Board</h1>
			</div>
			
			{boardItems.length === 0 ? (
				<div className="flex min-h-[400px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
					<div className="text-center">
						<p className="text-xl font-medium text-gray-500">No board items yet</p>
						<p className="mt-2 text-sm text-gray-400">Check back later for new posts</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{boardItems.map((item: BoardItemListDto) => (
						<Card key={item.id}>
							<CardHeader className="border-b-0 pb-3 !text-left">
								<h3 className="text-lg font-semibold leading-tight">
									{item.title}
								</h3>
							</CardHeader>
							<CardContent className="flex-col items-start">
								<p className="mb-4 line-clamp-4 text-sm leading-relaxed text-gray-700">
									{item.content}
								</p>
								<div className="mt-auto w-full space-y-2 border-t pt-3 text-xs text-gray-500">
									<div className="flex items-center gap-2">
										<User className="h-3.5 w-3.5" />
										<span className="truncate">
											{item.authorName || 'Unknown Author'}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<Calendar className="h-3.5 w-3.5" />
										<span>
											{new Date(item.createdAt).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'short',
												day: 'numeric'
											})}
										</span>
									</div>
									{item.eventName && (
										<div className="flex items-center gap-2">
											<span className="font-medium">Event:</span>
											<span className="truncate">{item.eventName}</span>
										</div>
									)}
									{item.eventStartDate && (
										<div className="flex items-center gap-2">
											<span className="font-medium">Event Date:</span>
											<span>
												{new Date(item.eventStartDate).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'short',
													day: 'numeric'
												})}
											</span>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default BoardPage;
