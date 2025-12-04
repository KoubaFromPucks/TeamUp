import type { UserListModel, UserInsertModel } from './schema';

import { userMapper } from './mapper';
import { userRepository } from '@/repositories/user/user-repository';

export const userService = {
	async doesUserExist(email: string, id?: string): Promise<boolean> {
		if (await userRepository.getUserByMail(email)) {
			return true;
		} else if (id && (await userRepository.getUserById(id))) {
			return true;
		}

		return false;
	},

	async getUserById(userId: string) {
		const user = await userRepository.getUserById(userId);
		return user ? userMapper.mapEntityToListModel(user) : undefined;
	},

	async getUserByMail(email: string) {
		const user = await userRepository.getUserByMail(email);
		return user ? userMapper.mapEntityToListModel(user) : undefined;
	},

	async getAllUsers(): Promise<UserListModel[]> {
		const users = await userRepository.getAllUsers();
		return users.map(userMapper.mapEntityToListModel);
	},

	async updateUserById(userId: string, user: Partial<UserInsertModel>) {
		if (!(await this.getUserById(userId))) {
			throw new Error('User does not exist');
		}
		const userInsertEntity = userMapper.mapPartialInsertModelToEntity(user);

		if (userInsertEntity.email) {
			const existingUser = await userRepository.getUserByMail(
				userInsertEntity.email
			);
			if (existingUser && existingUser.id !== userId) {
				throw new Error('Another user with this email already exists');
			}
		}

		const updatedUser = await userRepository.updateUserById(
			userId,
			userInsertEntity
		);
		if (!updatedUser) {
			throw new Error('User update failed');
		}

		return userMapper.mapEntityToListModel(updatedUser);
	},

	async getUserWithTeamsById(userId: string) {
		const user = await userRepository.getUserWithTeamsById(userId);
		if (!user) {
			throw new Error('User not found');
		}

		return userMapper.mapEntityWithTeamsToDetailModel(user);
	}
};
