import { deleteEvent } from '@/facades/event/event-facade';
import { useMutation } from '@tanstack/react-query';

export const useDeleteEventMutation = () =>
	useMutation({
		mutationFn: async (id: string) => {
			const { error, ok } = await deleteEvent(id);
			if (!ok) {
				throw new Error(error ?? 'Failed to delete event');
			}
			return id;
		}
	});
