'use client';

import React from 'react';
import { Button } from '@/components/basic-components/button';
import { useDeleteVenueMutation } from './hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const DeleteVenueButton = ({ id }: { id: string }) => {
	const deleteMutation = useDeleteVenueMutation();
	const router = useRouter();

	return (
		<Button
			disabled={deleteMutation.isPending}
			onClick={() => {
				deleteMutation.mutate(id, {
					onSuccess: () => {
						toast.success('Venue deleted successfully');
						router.push('/venues');
					},
					onError: e => toast.error(e.message)
				});
			}}
			variant="destructive"
		>
			{deleteMutation.isPending ? 'Deleting...' : 'Delete'}
		</Button>
	);
};
