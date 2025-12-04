import type {
	UserSelectEntity,
	UserInsertEntity,
	UserWithTeamsEntity
} from '@/repositories/user/schema';
import { db, teamTable, userTable, teamMemberTable } from '@/db';
import { eq } from 'drizzle-orm';

export const userRepository = {
	async getUserById(userId: string) {
		try {
			const user = await db
				.select()
				.from(userTable)
				.where(eq(userTable.id, userId))
				.limit(1);

			return user[0] as UserSelectEntity | undefined;
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			throw new Error('Could not fetch user by ID');
		}
	},

	async getUserByMail(email: string) {
		try {
			const user = await db
				.select()
				.from(userTable)
				.where(eq(userTable.email, email))
				.limit(1);

			return user[0] as UserSelectEntity | undefined;
		} catch (error) {
			console.error('Error fetching user by email:', error);
			throw new Error('Could not fetch user by email');
		}
	},

	async getAllUsers() {
		try {
			const users = await db.select().from(userTable);
			return users as UserSelectEntity[];
		} catch (error) {
			console.error('Error fetching all users:', error);
			throw new Error('Could not fetch users');
		}
	},

	async updateUserById(userId: string, userEntity: Partial<UserInsertEntity>) {
		try {
			const updatedUser = await db
				.update(userTable)
				.set(userEntity)
				.where(eq(userTable.id, userId))
				.returning();

			return updatedUser[0] as UserSelectEntity | undefined;
		} catch (error) {
			console.error('Error updating user by ID:', error);
			throw new Error('Could not update user by ID');
		}
	},

	async getUserWithTeamsById(userId: string) {
		let user;
		try {
			user = await db.select().from(userTable).where(eq(userTable.id, userId));

			if (user.length === 0) {
				return undefined;
			}
		} catch (error) {
			console.error('Error fetching user with teams by ID:', error);
			throw new Error('Could not fetch user with teams by ID');
		}

		let adminedTeams;
		try {
			adminedTeams = await db
				.select()
				.from(teamTable)
				.where(eq(teamTable.organizerId, userId))
				.all();
		} catch (error) {
			console.error('Error fetching admined teams for user:', error);
			throw new Error('Could not fetch admined teams for user');
		}

		let memberTeams;
		try {
			memberTeams = await db
				.select({ teams: teamTable })
				.from(teamTable)
				.leftJoin(teamMemberTable, eq(teamTable.id, teamMemberTable.teamId))
				.leftJoin(userTable, eq(teamMemberTable.userId, userTable.id))
				.where(eq(teamMemberTable.userId, userId))
				.all();
		} catch (error) {
			console.error('Error fetching member teams for user:', error);
			throw new Error('Could not fetch member teams for user');
		}

		const userWithTeamsEntity = {
			...user[0],
			adminedTeams,
			memberTeams: memberTeams.map(row => row.teams)
		};

		return userWithTeamsEntity as UserWithTeamsEntity;
	}
};
