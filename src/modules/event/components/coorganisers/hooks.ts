'use client';

import {
	addCoorganiser,
	removeCoorganiser
} from '@/facades/event/event-facade';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAddCoorganiserMutation = (eventId: string) => {
	const router = useRouter();

	return useMutation({
		mutationFn: async (userId: string) => {
			const { error } = await addCoorganiser({ eventId, userId });
			if (error) throw new Error(String(error));
			return userId;
		},
		onSuccess: () => {
			router.refresh();
		}
	});
};

export const useRemoveCoorganiserMutation = (eventId: string) => {
	const router = useRouter();

	return useMutation({
		mutationFn: async (userId: string) => {
			const { error } = await removeCoorganiser({ eventId, userId });
			if (error) throw new Error(String(error));
			return userId;
		},
		onSuccess: () => {
			router.refresh();
		}
	});
};
