'use client';

import { Button } from '@/components/basic-components/button';
import { useDeleteConcreteEventMutation } from './update-concrete-event-form/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react';

export const DeleteConcreteEventButton = ({
	id,
	route
}: {
	id: string;
	route: string;
}) => {
	const deleteMutation = useDeleteConcreteEventMutation();
	const router = useRouter();

	return (
		<Button
			disabled={deleteMutation.isPending}
			onClick={() => {
				deleteMutation.mutate(id, {
					onSuccess: () => {
						router.push(route);
						toast.success('Concrete event deleted successfully');
					},
					onError: error => {
						toast.error(`Delete failed: ${error.message}`);
					}
				});
			}}
		>
			{deleteMutation.isPending ? 'Deleting...' : 'Delete'}
		</Button>
	);
};
