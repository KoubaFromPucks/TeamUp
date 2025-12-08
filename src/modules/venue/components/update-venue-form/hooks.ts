import { createUpdateVenue } from '@/facades/venue/venue-facade';
import { VenueUpdateDto } from '@/facades/venue/schema';
import { useMutation } from '@tanstack/react-query';

export const useUpdateVenueMutation = () =>
	useMutation({
		mutationFn: async ({
			data,
			id
		}: {
			data: VenueUpdateDto;
			id?: string;
		}) => {
			const { error, venue } = await createUpdateVenue(id, data);

			if (error) {
				throw new Error(String(error));
			}

			if (!venue) {
				throw new Error('Venue update failed');
			}

			return venue;
		}
	});
