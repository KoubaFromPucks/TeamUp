import { venueRepository } from '@/repositories/venue/repository';
import type { VenueInsertModel, VenueListModel } from './schema';
import { mapEntityToSelectModel, mapInsertModelToEntity } from './mapper';
import { authService } from '../auth/auth-service';

export const venueService = {
	async createVenue(model: VenueInsertModel): Promise<VenueListModel> {
		await authService.throwIfUserNotLoggedIn(
			'You must be logged in to create a venue.'
		);

		const entity = mapInsertModelToEntity(model);
		const created = await venueRepository.createVenue(entity);
		return mapEntityToSelectModel(created);
	},

	async getVenueById(id: string): Promise<VenueListModel | undefined> {
		const venue = await venueRepository.getVenueById(id);
		return venue ? mapEntityToSelectModel(venue) : undefined;
	},

	async getAllVenues(): Promise<VenueListModel[]> {
		const venues = await venueRepository.getAllVenues();
		return venues.map(mapEntityToSelectModel);
	},

	async updateVenueById(
		id: string,
		patch: Partial<VenueInsertModel>
	): Promise<VenueListModel | undefined> {
		await authService.throwIfUserNotLoggedIn(
			'You must be logged in to update a venue.'
		);

		const updated = await venueRepository.updateVenueById(id, patch);
		return updated ? mapEntityToSelectModel(updated) : undefined;
	},

	async deleteVenueById(id: string): Promise<VenueListModel | undefined> {
		await authService.throwIfUserNotLoggedIn(
			'You must be logged in to delete a venue.'
		);

		const deleted = await venueRepository.deleteVenueById(id);
		return deleted ? mapEntityToSelectModel(deleted) : undefined;
	}
};
