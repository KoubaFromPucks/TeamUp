'use server';

import { teamService } from '@/services/team/team-service';
import { TeamUpdateCreateDto, teamUpdateCreateSchema } from './schema';
import { teamMapper } from './mapper';

export const createUpdateTeam = async (
	teamId: string | null,
	team: TeamUpdateCreateDto
) => {
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
};

export const createTeam = async (team: TeamUpdateCreateDto) => {
	await createUpdateTeam(null, team);
};

export const updateTeam = async (teamId: string, team: TeamUpdateCreateDto) => {
	await createUpdateTeam(teamId, team);
};

export const deleteTeam = async (teamId: string) => {
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
};

export const getTeamById = async (teamId: string) => {
	try {
		const team = await teamService.getTeamById(teamId);
		return { error: null, team: teamMapper.mapTeamListModelToDto(team) };
	} catch (error) {
		return { error: (error as Error).message, team: null };
	}
};

export const getAllTeams = async () => {
	try {
		const teams = await teamService.getAllTeams();
		return {
			error: null,
			teams: teams.map(teamMapper.mapTeamListModelToDto)
		};
	} catch (error) {
		return { error: (error as Error).message, teams: [] };
	}
};

export const getTeamWithMembersById = async (teamId: string) => {
	try {
		console.log('TEAM FACADE TEAMD ID:', teamId);
		const team = await teamService.getTeamWithMembersById(teamId);
		console.log('Fetched team with members:', team);
		return { error: null, team: teamMapper.mapTeamDetailModelToDto(team) };
	} catch (error) {
		return { error: (error as Error).message, team: null };
	}
};

export const addUserToTeam = async (teamId: string, userId: string) => {
	try {
		await teamService.addUserToTeam(teamId, userId);
		return { error: null, ok: true };
	} catch (error) {
		return { error: (error as Error).message, ok: false };
	}
};

export const removeUserFromTeam = async (teamId: string, userId: string) => {
	try {
		await teamService.removeUserFromTeam(teamId, userId);
		return { error: null, ok: true };
	} catch (error) {
		return { error: (error as Error).message, ok: false };
	}
};
