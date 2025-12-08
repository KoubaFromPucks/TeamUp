'use server';

import { venueService } from '@/services/venue/service';
import { venueFacadeMapper } from './mapper';
import { venueUpdateSchema, VenueUpdateDto } from './schema';

export const createUpdateVenue = async (
	venueId: string | undefined,
	venue: VenueUpdateDto
) => {
	const validationResult = venueUpdateSchema.safeParse(venue);

	if (!validationResult.success) {
		const errors = validationResult.error.flatten().fieldErrors;
		return { error: errors, venue: null };
	}

	let result;
	try {
		if (venueId) {
			const patch = venueFacadeMapper.mapUpdateDtoToPatchModel(
				validationResult.data
			);
			result = await venueService.updateVenueById(venueId, patch);
		} else {
			const insertModel = venueFacadeMapper.mapUpdateDtoToInsertModel(
				validationResult.data
			);
			result = await venueService.createVenue(insertModel);
		}
	} catch (error) {
		return { error: (error as Error).message, venue: null };
	}

	if (!result) {
		return { error: 'Venue could not be created or updated', venue: null };
	}

	return {
		error: null,
		venue: venueFacadeMapper.mapListModelToDto(result)
	};
};

export const getVenueById = async (venueId: string) => {
	try {
		const result = await venueService.getVenueById(venueId);

		if (!result) {
			return { error: 'Venue not found', venue: null };
		}

		return {
			error: null,
			venue: venueFacadeMapper.mapDetailModelToDto(result)
		};
	} catch (error) {
		return { error: (error as Error).message, venue: null };
	}
};

export const getAllVenues = async () => {
	try {
		const result = await venueService.getAllVenues();

		if (!result) {
			return { error: 'Venues not found', venues: null };
		}

		return {
			error: null,
			venues: result.map(venueFacadeMapper.mapListModelToDto)
		};
	} catch (error) {
		return { error: (error as Error).message, venues: null };
	}
};

export const deleteVenue = async (venueId: string) => {
	try {
		const result = await venueService.deleteVenueById(venueId);

		if (!result) {
			return { error: 'Venue could not be deleted', ok: false };
		}

		return { error: null, ok: true };
	} catch (error) {
		return { error: (error as Error).message, ok: false };
	}
};
