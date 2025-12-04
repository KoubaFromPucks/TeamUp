import { TeamUpdateCreateDto } from '@/facades/team/schema';
import { useMutation } from '@tanstack/react-query';
import { createUpdateTeam } from '@/facades/team/team-facade';

export const useUpdateTeamMutation = () =>
	useMutation({
		mutationFn: async ({
			data,
			id
		}: {
			data: TeamUpdateCreateDto;
			id: string;
		}) => {
			const { error, team } = await createUpdateTeam(id, data);

			if (error) {
				throw new Error(String(error));
			}

			if (!team) {
				throw new Error('Team update failed');
			}

			return team;
		}
	});
