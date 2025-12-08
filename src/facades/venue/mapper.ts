import type {
	VenueDetailModel,
	VenueInsertModel,
	VenueListModel
} from '@/services/venue/schema';
import type { VenueDetailDto, VenueListDto, VenueUpdateDto } from './schema';

function mapDetailModelToDto(model: VenueDetailModel): VenueDetailDto {
	return {
		id: model.id,
		name: model.name,
		address: model.address,
		gps: model.gps ?? null,
		description: model.description ?? null,
		pricePerHour: model.pricePerHour ?? 0,
		ownerId: model.ownerId
	};
}

function mapListModelToDto(model: VenueListModel): VenueListDto {
	return mapDetailModelToDto(model);
}

function mapUpdateDtoToInsertModel(dto: VenueUpdateDto): VenueInsertModel {
	return {
		name: dto.name,
		address: dto.address,
		gps: dto.gps ?? null,
		description: dto.description ?? null,
		pricePerHour: dto.pricePerHour ?? 0,
		ownerId: dto.ownerId
	};
}

function mapUpdateDtoToPatchModel(
	dto: Partial<VenueUpdateDto>
): Partial<VenueInsertModel> {
	return {
		name: dto.name,
		address: dto.address,
		gps: dto.gps ?? null,
		description: dto.description ?? null,
		pricePerHour: dto.pricePerHour,
		ownerId: dto.ownerId
	};
}

export const venueFacadeMapper = {
	mapDetailModelToDto,
	mapListModelToDto,
	mapUpdateDtoToInsertModel,
	mapUpdateDtoToPatchModel
};
