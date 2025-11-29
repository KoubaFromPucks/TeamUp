import { TeamInsertModel } from './schema';

import { teamMapper } from './mapper';
import { teamRepository } from '@/repositories/team/team-repository';
import { userRepository } from '@/repositories/user/user-repository';

export const teamService = {
	async doesTeamExist(teamId: string): Promise<boolean> {
		const team = await teamRepository.getTeamById(teamId);
		return !!team;
	},

	async createTeam(team: TeamInsertModel) {
		const createdTeam = await teamRepository.createTeam(
			teamMapper.mapInsertModelToEntity(team)
		);
		if (!createdTeam) {
			throw new Error('Team creation failed');
		}

		return teamMapper.mapEntityToListModel(createdTeam);
	},

	async getTeamById(teamId: string) {
		const teamEntity = await teamRepository.getTeamById(teamId);
		if (!teamEntity) {
			throw new Error('Team not found');
		}

		return teamMapper.mapEntityToListModel(teamEntity);
	},

	async getAllTeams() {
		const teamEntities = await teamRepository.getAllTeams();
		return teamEntities.map(teamMapper.mapEntityToListModel);
	},

	async updateTeamById(teamId: string, teamEntity: Partial<TeamInsertModel>) {
		const updatedTeam = await teamRepository.updateTeamById(teamId, teamEntity);
		if (!updatedTeam) {
			throw new Error('Team update failed');
		}

		return teamMapper.mapEntityToListModel(updatedTeam);
	},

	async getTeamWithMembersById(teamId: string) {
		const teamEntity = await teamRepository.getTeamWithMembersById(teamId);
		if (!teamEntity) {
			throw new Error('Team not found');
		}

		return teamMapper.mapEntityToDetailModel(teamEntity);
	},

	async addUserToTeam(teamId: string, userId: string) {
		if (!(await this.doesTeamExist(teamId))) {
			throw new Error('Team does not exist');
		}

		if (!(await userRepository.getUserById(userId))) {
			throw new Error('User does not exist');
		}

		const result = await teamRepository.addUserToTeam(teamId, userId);
		if (!result) {
			throw new Error('Adding user to team failed');
		}
	},

	async removeUserFromTeam(teamId: string, userId: string) {
		if (!(await this.doesTeamExist(teamId))) {
			throw new Error('Team does not exist');
		}

		if (!(await userRepository.getUserById(userId))) {
			throw new Error('User does not exist');
		}

		if (!(await teamRepository.isUserInTeam(teamId, userId))) {
			throw new Error('User is not in the team');
		}

		const result = await teamRepository.removeUserFromTeam(teamId, userId);
		if (!result) {
			throw new Error('Removing user from team failed');
		}
	},

	async deleteTeamById(teamId: string) {
		if (!(await this.doesTeamExist(teamId))) {
			throw new Error('Team does not exist');
		}

		const result = await teamRepository.deleteTeamById(teamId);
		if (!result) {
			throw new Error('Deleting team failed');
		}

		return true;
	}
};
