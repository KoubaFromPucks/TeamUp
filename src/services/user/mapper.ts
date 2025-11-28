import { UserInsertModel, UserListModel } from './schema';
import { UserInsertEntity, UserSelectEntity } from '@/db/schema/user';

export const mapEntityToSelectModel = (
	entity: UserSelectEntity
): UserListModel => ({
	id: entity.id,
	name: entity.name,
	surname: entity.surname,
	nickname: entity.nickname,
	email: entity.email,
	phoneNumber: entity.phoneNumber,
	avatarUrl: entity.imageUrl
});

export const mapSelectModelToEntity = (
	model: UserListModel
): UserSelectEntity => ({
	id: model.id,
	name: model.name,
	surname: model.surname,
	nickname: model.nickname,
	email: model.email,
	phoneNumber: model.phoneNumber,
	imageUrl: model.avatarUrl
});

export const mapInsertModelToEntity = (
	model: Omit<UserInsertModel, 'id'>
): UserInsertEntity => ({
	name: model.name,
	surname: model.surname,
	nickname: model.nickname,
	email: model.email,
	phoneNumber: model.phoneNumber,
	imageUrl: model.avatarUrl
});

export const mapEntityToInsertModel = (
	entity: UserInsertEntity
): UserInsertModel => ({
	name: entity.name,
	surname: entity.surname,
	nickname: entity.nickname,
	email: entity.email,
	phoneNumber: entity.phoneNumber ?? null,
	avatarUrl: entity.imageUrl ?? null
});
