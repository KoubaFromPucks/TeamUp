import { deleteVenue } from '@/facades/venue/venue-facade';
import { useMutation } from '@tanstack/react-query';

export const useDeleteVenueMutation = () =>
	useMutation({
		mutationFn: async (id: string) => {
			const { error, ok } = await deleteVenue(id);
			if (!ok) {
				throw new Error(error ?? 'Failed to delete venue');
			}
			return id;
		}
	});
