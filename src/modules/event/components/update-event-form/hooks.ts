import { createUpdateEvent } from '@/facades/event/event-facade';
import { EventUpdateDto } from '@/facades/event/schema';
import { useMutation } from '@tanstack/react-query';

export const useUpdateEventMutation = () =>
	useMutation({
		mutationFn: async ({
			data,
			id
		}: {
			data: EventUpdateDto;
			id?: string;
		}) => {
			const { error, event } = await createUpdateEvent(id, data);

			if (error) {
				throw new Error(String(error));
			}

			if (!event) {
				throw new Error('Event update failed');
			}

			return event;
		}
	});
