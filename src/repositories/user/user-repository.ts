import type { UserCreateEntity, UserEntity } from './schema';
import { db, userTable } from '@/db';
import { eq } from 'drizzle-orm';

export const userRepository = {
	async createUser(userEntity: UserCreateEntity) {
		const createdUser = await db
			.insert(userTable)
			.values(userEntity)
			.returning();
		return createdUser[0] as UserEntity;
	},

	async getUserById(userId: string) {
		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, userId))
			.limit(1);
		return user[0] as UserEntity | undefined;
	},

	async getAllUsers() {
		const users = await db.select().from(userTable);
		return users as UserEntity[];
	},

	async updateUserById(userId: string, userEntity: Partial<UserCreateEntity>) {
		const updatedUser = await db
			.update(userTable)
			.set(userEntity)
			.where(eq(userTable.id, userId))
			.returning();
		return updatedUser[0] as UserEntity | undefined;
	}
};
