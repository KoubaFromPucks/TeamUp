'use client';

import { Button } from '@/components/basic-components/button';
import { useDeleteConcreteEventMutation } from './update-concrete-event-form/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react';

export const DeleteConcreteEventButton = ({ id }: { id: string }) => {
	const deleteMutation = useDeleteConcreteEventMutation();
	const router = useRouter();

	return (
		<Button
			disabled={deleteMutation.isPending}
			onClick={() => {
				deleteMutation.mutate(id, {
					onSuccess: () => {
						router.push('/');
						toast.success('Concrete event deleted successfully');
					}
				});
			}}
		>
			{deleteMutation.isPending ? 'Deleting...' : 'Delete'}
		</Button>
	);
};
