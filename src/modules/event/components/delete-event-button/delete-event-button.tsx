'use client';

import { Button } from '@/components/basic-components/button';
import { useDeleteEventMutation } from './hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react';

export const DeleteEventButton = ({ id }: { id: string }) => {
	const deleteMutation = useDeleteEventMutation();
	const router = useRouter();

	return (
		<Button
			disabled={deleteMutation.isPending}
			onClick={() => {
				deleteMutation.mutate(id, {
					onSuccess: () => {
						toast.success('Event deleted successfully');
						router.push('/events');
					},
					onError: e => toast.error(`Delete failed: ${e.message}`)
				});
			}}
			variant="destructive"
		>
			{deleteMutation.isPending ? 'Deleting...' : 'Delete'}
		</Button>
	);
};
