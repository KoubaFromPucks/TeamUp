import {
	TeamInsertEntity,
	TeamSelectEntity,
	TeamWithMembersEntity
} from './schema';
import { db, teamMemberTable, teamTable, userTable } from '@/db';
import { and, eq } from 'drizzle-orm';

export const teamRepository = {
	async createTeam(teamEntity: TeamInsertEntity) {
		const createdTeam = await db
			.insert(teamTable)
			.values(teamEntity)
			.returning();
		return createdTeam[0] as TeamSelectEntity;
	},

	async getTeamById(teamId: string) {
		const team = await db
			.select()
			.from(teamTable)
			.where(eq(teamTable.id, teamId))
			.limit(1);
		return team[0] as TeamSelectEntity | undefined;
	},

	async getAllTeams() {
		const teams = await db.select().from(teamTable);
		return teams as TeamSelectEntity[];
	},

	async updateTeamById(teamId: string, teamEntity: Partial<TeamInsertEntity>) {
		const updatedTeam = await db
			.update(teamTable)
			.set(teamEntity)
			.where(eq(teamTable.id, teamId))
			.returning();
		return updatedTeam[0] as TeamSelectEntity | undefined;
	},

	async getTeamWithMembersById(teamId: string) {
		const dbResult = await db
			.select()
			.from(teamTable)
			.leftJoin(teamMemberTable, eq(teamTable.id, teamMemberTable.teamId))
			.leftJoin(userTable, eq(teamMemberTable.userId, userTable.id))
			.where(eq(teamTable.id, teamId))
			.all();

		if (dbResult.length === 0) {
			return null;
		}

		const organizer = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, dbResult[0].teams.organizerId));

		const teamWithMembers = {
			...dbResult[0].teams,
			members: dbResult.map(row => row.users),
			organizer: organizer[0]
		};

		return teamWithMembers as TeamWithMembersEntity;
	},

	async addUserToTeam(teamId: string, userId: string) {
		return await db
			.insert(teamMemberTable)
			.values({
				teamId,
				userId
			})
			.returning();
	},

	async removeUserFromTeam(teamId: string, userId: string) {
		return await db
			.delete(teamMemberTable)
			.where(
				and(
					eq(teamMemberTable.teamId, teamId),
					eq(teamMemberTable.userId, userId)
				)
			)
			.returning();
	},

	async isUserInTeam(teamId: string, userId: string) {
		const membership = await db
			.select()
			.from(teamMemberTable)
			.where(
				and(
					eq(teamMemberTable.teamId, teamId),
					eq(teamMemberTable.userId, userId)
				)
			)
			.limit(1);

		return membership.length > 0;
	}
};
