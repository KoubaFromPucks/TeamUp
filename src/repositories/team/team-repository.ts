import {
	TeamInsertEntity,
	TeamSelectEntity,
	TeamWithMembersEntity
} from './schema';
import { db, teamMemberTable, teamTable, userTable } from '@/db';
import { and, eq } from 'drizzle-orm';

export const teamRepository = {
	async createTeam(teamEntity: TeamInsertEntity) {
		try {
			const createdTeam = await db
				.insert(teamTable)
				.values(teamEntity)
				.returning();

			return createdTeam[0] as TeamSelectEntity;
		} catch (error) {
			console.error('Error creating team:', error);
			throw new Error('Could not create team');
		}
	},

	async getTeamById(teamId: string) {
		try {
			const team = await db
				.select()
				.from(teamTable)
				.where(eq(teamTable.id, teamId))
				.limit(1);

			return team[0] as TeamSelectEntity | undefined;
		} catch (error) {
			console.error('Error fetching team by ID:', error);
			throw new Error('Could not fetch team by ID');
		}
	},

	async getAllTeams() {
		try {
			const teams = await db.select().from(teamTable);
			return teams as TeamSelectEntity[];
		} catch (error) {
			console.error('Error fetching all teams:', error);
			throw new Error('Could not fetch teams');
		}
	},

	async updateTeamById(teamId: string, teamEntity: Partial<TeamInsertEntity>) {
		try {
			const updatedTeam = await db
				.update(teamTable)
				.set(teamEntity)
				.where(eq(teamTable.id, teamId))
				.returning();

			return updatedTeam[0] as TeamSelectEntity | undefined;
		} catch (error) {
			console.error('Error updating team by ID:', error);
			throw new Error('Could not update team by ID');
		}
	},

	async getTeamWithMembersById(teamId: string) {
		let dbResult;
		try {
			dbResult = await db
				.select()
				.from(teamTable)
				.leftJoin(teamMemberTable, eq(teamTable.id, teamMemberTable.teamId))
				.leftJoin(userTable, eq(teamMemberTable.userId, userTable.id))
				.where(eq(teamTable.id, teamId))
				.all();
		} catch (error) {
			console.error('Error fetching team with members by ID:', error);
			throw new Error('Could not fetch team with members by ID');
		}

		if (dbResult.length === 0) {
			return null;
		}

		let organizer;

		try {
			organizer = await db
				.select()
				.from(userTable)
				.where(eq(userTable.id, dbResult[0].teams.organizerId));
		} catch (error) {
			console.error('Error fetching team organizer:', error);
			throw new Error('Could not fetch team organizer');
		}

		const teamWithMembers = {
			...dbResult[0].teams,
			members: dbResult.map(row => row.users),
			organizer: organizer[0]
		};

		return teamWithMembers as TeamWithMembersEntity;
	},

	async addUserToTeam(teamId: string, userId: string) {
		try {
			return await db
				.insert(teamMemberTable)
				.values({
					teamId,
					userId
				})
				.returning();
		} catch (error) {
			console.error('Error adding user to team:', error);
			throw new Error('Could not add user to team');
		}
	},

	async removeUserFromTeam(teamId: string, userId: string) {
		try {
			return await db
				.delete(teamMemberTable)
				.where(
					and(
						eq(teamMemberTable.teamId, teamId),
						eq(teamMemberTable.userId, userId)
					)
				)
				.returning();
		} catch (error) {
			console.error('Error removing user from team:', error);
			throw new Error('Could not remove user from team');
		}
	},

	async isUserInTeam(teamId: string, userId: string) {
		try {
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
		} catch (error) {
			console.error('Error checking if user is in team:', error);
			throw new Error('Could not check if user is in team');
		}
	},

	async deleteTeamById(teamId: string) {
		try {
			const deletedTeam = await db
				.delete(teamTable)
				.where(eq(teamTable.id, teamId))
				.returning();

			return deletedTeam[0] as TeamSelectEntity | undefined;
		} catch (error) {
			console.error('Error deleting team by ID:', error);
			throw new Error('Could not delete team by ID');
		}
	}
};
