import { deleteTeam } from '@/facades/team/team-facade';
import { useMutation } from '@tanstack/react-query';

export const useRemoveTeamMutation = () =>
	useMutation({
		mutationFn: async ({ teamId }: { teamId: string }) => {
			const { error: userError, ok: ok } = await deleteTeam(teamId);

			if (userError || !ok) {
				throw new Error(userError ?? 'Could not delete team');
			}

			return true;
		}
	});
