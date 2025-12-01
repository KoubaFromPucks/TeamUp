import type {
	UserSelectEntity,
	UserInsertEntity,
	UserWithTeamsEntity
} from '@/repositories/user/schema';
import { db, teamTable, userTable, teamMemberTable } from '@/db';
import { eq } from 'drizzle-orm';

export const userRepository = {
	async createUser(userEntity: UserInsertEntity) {
		const createdUser = await db
			.insert(userTable)
			.values(userEntity)
			.returning();
		return createdUser[0] as UserSelectEntity;
	},

	async getUserById(userId: string) {
		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, userId))
			.limit(1);
		return user[0] as UserSelectEntity | undefined;
	},

	async getUserByMail(email: string) {
		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, email))
			.limit(1);

		return user[0] as UserSelectEntity | undefined;
	},

	async getAllUsers() {
		const users = await db.select().from(userTable);
		return users as UserSelectEntity[];
	},

	async updateUserById(userId: string, userEntity: Partial<UserInsertEntity>) {
		const updatedUser = await db
			.update(userTable)
			.set(userEntity)
			.where(eq(userTable.id, userId))
			.returning();
		return updatedUser[0] as UserSelectEntity | undefined;
	},

	async getUserWithTeamsById(userId: string) {
		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, userId));

		if (user.length === 0) {
			return undefined;
		}

		const adminedTeams = await db
			.select()
			.from(teamTable)
			.where(eq(teamTable.organizerId, userId))
			.all();

		const memeberTeams = await db
			.select({ teams: teamTable })
			.from(teamTable)
			.leftJoin(teamMemberTable, eq(teamTable.id, teamMemberTable.teamId))
			.leftJoin(userTable, eq(teamMemberTable.userId, userTable.id))
			.where(eq(teamMemberTable.userId, userId))
			.all();

		const userWithTeamsEntity = {
			...user[0],
			adminedTeams,
			memberTeams: memeberTeams.map(row => row.teams)
		};

		return userWithTeamsEntity as UserWithTeamsEntity;
	}
};
