'use server';

import { userService } from '@/services/user/user-service';
import { UserUpdateCreateDto, userUpdateCreateSchema } from './schema';

import { userMapper } from './mapper';

export const userFacade = {
	async createUpdateUser(
		userId: string | undefined,
		user: UserUpdateCreateDto
	) {
		const validationResult = userUpdateCreateSchema.safeParse(user);

		if (!validationResult.success) {
			const errors = validationResult.error.flatten().fieldErrors;
			return { error: errors, user: null };
		}

		let result;
		const insertUserDto = userMapper.mapDtoToUserInsertModel(
			validationResult.data
		);

		try {
			if (userId) {
				result = await userService.updateUserById(userId, insertUserDto);
			} else {
				result = await userService.createUser(insertUserDto);
			}
		} catch (error) {
			return { error: (error as Error).message, user: null };
		}

		return { error: null, user: userMapper.mapUserListModelToDto(result) };
	},

	async createUser(user: UserUpdateCreateDto) {
		await this.createUpdateUser(undefined, user);
	},

	async updateUser(userId: string, user: UserUpdateCreateDto) {
		await this.createUpdateUser(userId, user);
	},

	async getUserById(userId: string) {
		try {
			const user = await userService.getUserById(userId);
			if (!user) {
				return { error: 'User not found', user: null };
			}

			return { error: null, user: userMapper.mapUserListModelToDto(user) };
		} catch (error) {
			return { error: (error as Error).message, user: null };
		}
	},

	async getAllUsers() {
		try {
			const users = await userService.getAllUsers();
			return {
				error: null,
				users: users.map(userMapper.mapUserListModelToDto)
			};
		} catch (error) {
			return { error: (error as Error).message, users: null };
		}
	},

	async getUserWithTeamsById(userId: string) {
		try {
			const user = await userService.getUserWithTeamsById(userId);
			if (!user) {
				return { error: 'User not found', user: null };
			}

			return { error: null, user: userMapper.mapUserListModelToDto(user) };
		} catch (error) {
			return { error: (error as Error).message, user: null };
		}
	}
};
