import type { VenueInsertModel, VenueListModel } from "./schema";
import type {
  VenueInsertEntity,
  VenueSelectEntity,
} from "@/repositories/venue/schema";

export const mapEntityToSelectModel = (
  entity: VenueSelectEntity
): VenueListModel => ({
  Id: entity.Id,
  Name: entity.Name,
  Address: entity.Address,
  GPS: entity.GPS ?? null,
  Description: entity.Description ?? null,
  PricePerHour: entity.PricePerHour ?? 0,
});

export const mapSelectModelToEntity = (
  model: VenueListModel
): VenueSelectEntity => ({
  Id: model.Id,
  Name: model.Name,
  Address: model.Address,
  GPS: model.GPS,
  Description: model.Description,
  PricePerHour: model.PricePerHour,
});

export const mapInsertModelToEntity = (
  model: VenueInsertModel
): VenueInsertEntity => ({
  Name: model.Name,
  Address: model.Address,
  GPS: model.GPS,
  Description: model.Description,
  PricePerHour: model.PricePerHour,
});

export const mapEntityToInsertModel = (
  entity: VenueInsertEntity
): VenueInsertModel => ({
  Name: entity.Name,
  Address: entity.Address,
  GPS: entity.GPS ?? null,
  Description: entity.Description ?? null,
  PricePerHour: entity.PricePerHour ?? 0,
});