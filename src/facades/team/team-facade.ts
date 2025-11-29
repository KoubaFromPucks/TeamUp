'use server';

import { teamService } from '@/services/team/team-service';
import { TeamUpdateCreateDto, teamUpdateCreateSchema } from './schema';
import { teamMapper } from './mapper';

export const teamFacade = {
	async createUpdateTeam(teamId: string | null, team: TeamUpdateCreateDto) {
		const validationResult = teamUpdateCreateSchema.safeParse(team);

		if (!validationResult.success) {
			const errors = validationResult.error.flatten().fieldErrors;
			return { error: errors, team: null };
		}

		let result;
		const insertTeamDto = teamMapper.mapDtoToTeamInsertModel(
			validationResult.data
		);

		try {
			if (teamId) {
				result = await teamService.updateTeamById(teamId, insertTeamDto);
			} else {
				result = await teamService.createTeam(insertTeamDto);
			}
		} catch (error) {
			return { error: (error as Error).message, team: null };
		}

		return { error: null, team: teamMapper.mapTeamListModelToDto(result) };
	},

	async createTeam(team: TeamUpdateCreateDto) {
		await this.createUpdateTeam(null, team);
	},

	async updateTeam(teamId: string, team: TeamUpdateCreateDto) {
		await this.createUpdateTeam(teamId, team);
	},

	async deleteTeam(teamId: string) {
		let result;

		try {
			result = await teamService.deleteTeamById(teamId);
		} catch (error) {
			return { error: (error as Error).message, ok: false };
		}

		if (!result) {
			return { error: 'Team could not be deleted', ok: false };
		}

		return { error: null, ok: true };
	},

	async getTeamById(teamId: string) {
		try {
			const team = await teamService.getTeamById(teamId);
			return { error: null, team: teamMapper.mapTeamListModelToDto(team) };
		} catch (error) {
			return { error: (error as Error).message, team: null };
		}
	},

	async getAllTeams() {
		try {
			const teams = await teamService.getAllTeams();
			return {
				error: null,
				teams: teams.map(teamMapper.mapTeamListModelToDto)
			};
		} catch (error) {
			return { error: (error as Error).message, teams: [] };
		}
	},

	async getTeamWithMembersById(teamId: string) {
		try {
			const team = await teamService.getTeamWithMembersById(teamId);
			return { error: null, team: teamMapper.mapTeamDetailModelToDto(team) };
		} catch (error) {
			return { error: (error as Error).message, team: null };
		}
	},

	async addUserToTeam(teamId: string, userId: string) {
		try {
			await teamService.addUserToTeam(teamId, userId);
			return { error: null, ok: true };
		} catch (error) {
			return { error: (error as Error).message, ok: false };
		}
	},

	async removeUserFromTeam(teamId: string, userId: string) {
		try {
			await teamService.removeUserFromTeam(teamId, userId);
			return { error: null, ok: true };
		} catch (error) {
			return { error: (error as Error).message, ok: false };
		}
	}
};
