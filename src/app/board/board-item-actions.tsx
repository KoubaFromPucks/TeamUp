'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteBoardItemById } from '@/facades/board/board-item-facade';
import { Button } from '@/components/basic-components/button';

type BoardItemActionsProps = {
	itemId: string;
};

export const BoardItemActions = ({ itemId }: BoardItemActionsProps) => {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		if (!confirm('Are you sure you want to delete this board item?')) {
			return;
		}

		setIsDeleting(true);
		try {
			const result = await deleteBoardItemById(itemId);

			if (result.error) {
				toast.error(`Failed to delete: ${result.error}`);
			} else {
				toast.success('Board item deleted successfully');
				router.refresh();
			}
		} catch (error) {
			toast.error(`An unexpected error occurred: ${error}`);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="flex items-center gap-1">
			<Link
				href={`/board/edit/${itemId}`}
				className="flex-shrink-0 rounded p-1 hover:bg-gray-100"
				title="Edit board item"
			>
				<Pencil className="h-4 w-4 text-gray-600" />
			</Link>
			<Button
				onClick={handleDelete}
				disabled={isDeleting}
				variant="ghost"
				size="icon"
				className="h-8 w-8 hover:bg-red-100"
				title="Delete board item"
			>
				<Trash2 className="h-4 w-4 text-red-600" />
			</Button>
		</div>
	);
};
