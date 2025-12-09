import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/card';
import { Calendar, User } from 'lucide-react';
import type { BoardItemListDto } from '@/facades/board/schema';
import { BoardItemActions } from '@/app/board/board-item-actions';

const formatDate = (iso: string) => {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return new Intl.DateTimeFormat('cs-CZ', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(d);
};

type BoardItemCardProps = {
	item: BoardItemListDto;
	showActions?: boolean;
	showEvent?: boolean;
	canUserModify?: boolean;
};

export const BoardItemCard = ({
	item,
	showActions = false,
	showEvent = false,
	canUserModify = false
}: BoardItemCardProps) => (
	<div className="flex h-full min-h-[210px]">
		<div className="flex flex-1 flex-col">
			<Card>
				<CardHeader className="border-b-0 pb-3 !text-left">
					<div className="flex items-start justify-between gap-2">
						<h3 className="text-lg leading-tight font-semibold">
							{item.title}
						</h3>
						{showActions && canUserModify && (
							<BoardItemActions itemId={item.id} />
						)}
					</div>
				</CardHeader>

				<CardContent className="w-full flex-1 !flex-col !items-start !justify-start lg:!flex-col lg:!items-start lg:!justify-start">
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
							<span>{formatDate(item.createdAt)}</span>
						</div>

						{item.eventName && showEvent && (
							<div className="flex items-center gap-2">
								<span className="font-medium">Event:</span>
								<span className="truncate">{item.eventName}</span>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
);
