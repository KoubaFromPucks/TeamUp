'use server';

import { userService } from '@/services/user/user-service';
import { UserUpdateCreateDto, userUpdateCreateSchema } from './schema';

import { userMapper } from './mapper';

export const updateUser = async (
	userId: string,
	user: UserUpdateCreateDto
) => {
	const validationResult = userUpdateCreateSchema.safeParse(user);

	if (!validationResult.success) {
		const errors = validationResult.error.flatten().fieldErrors;
		return { error: errors, user: null };
	}

	const insertUserDto = userMapper.mapDtoToUserInsertModel(
		validationResult.data
	);

	try {
		const result = await userService.updateUserById(userId, insertUserDto);

		return { error: null, user: userMapper.mapUserListModelToDto(result) };
	} catch (error) {
		return { error: (error as Error).message, user: null };
	}
};

export const getUserById = async (userId: string) => {
	try {
		const user = await userService.getUserById(userId);
		if (!user) {
			return { error: 'User not found', user: null };
		}

		return { error: null, user: userMapper.mapUserListModelToDto(user) };
	} catch (error) {
		return { error: (error as Error).message, user: null };
	}
};

export const getUserByMail = async (email: string) => {
	try {
		const user = await userService.getUserByMail(email);
		if (!user) {
			return { error: 'User not found', user: null };
		}

		return { error: null, user: userMapper.mapUserListModelToDto(user) };
	} catch (error) {
		return { error: (error as Error).message, user: null };
	}
};

export const getAllUsers = async () => {
	try {
		const users = await userService.getAllUsers();
		return {
			error: null,
			users: users.map(userMapper.mapUserListModelToDto)
		};
	} catch (error) {
		return { error: (error as Error).message, users: null };
	}
};

export const getUserWithTeamsById = async (userId: string) => {
	try {
		const user = await userService.getUserWithTeamsById(userId);
		if (!user) {
			return { error: 'User not found', user: null };
		}

		return { error: null, user: userMapper.mapUserDetailModelToDto(user) };
	} catch (error) {
		return { error: (error as Error).message, user: null };
	}
};
