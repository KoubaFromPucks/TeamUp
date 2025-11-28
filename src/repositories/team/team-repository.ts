import { TeamInsertEntity, TeamSelectEntity } from '@/db/schema/team';
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
		const teamWithMembers = await db
			.select()
			.from(teamTable)
			.leftJoin(teamMemberTable, eq(teamTable.id, teamMemberTable.teamId))
			.leftJoin(userTable, eq(teamMemberTable.userId, userTable.id))
			.where(eq(teamTable.id, teamId))
			.limit(1);

		return teamWithMembers[0];
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
	}
};
