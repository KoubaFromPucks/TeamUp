import type { TeamCreateEntity, TeamEntity } from './schema';
import { db, teamMemberTable, teamTable, userTable } from '@/db';
import { eq } from 'drizzle-orm';

export const teamRepository = {
	async createTeam(teamEntity: TeamCreateEntity) {
		const createdTeam = await db
			.insert(teamTable)
			.values(teamEntity)
			.returning();
		return createdTeam[0] as TeamEntity;
	},

	async getTeamById(teamId: string) {
		const team = await db
			.select()
			.from(teamTable)
			.where(eq(teamTable.id, teamId))
			.limit(1);
		return team[0] as TeamEntity | undefined;
	},

	async getAllTeams() {
		const teams = await db.select().from(teamTable);
		return teams as TeamEntity[];
	},

	async updateTeamById(teamId: string, teamEntity: Partial<TeamCreateEntity>) {
		const updatedTeam = await db
			.update(teamTable)
			.set(teamEntity)
			.where(eq(teamTable.id, teamId))
			.returning();
		return updatedTeam[0] as TeamEntity | undefined;
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

};
