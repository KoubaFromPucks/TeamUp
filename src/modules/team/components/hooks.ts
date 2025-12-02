import { removeUserFromTeam } from '@/facades/team/team-facade';
import { useMutation } from '@tanstack/react-query';

export const useRemoveUserFromTeam = () =>
	useMutation({
		mutationFn: async ({
			teamId,
			userId
		}: {
			teamId: string;
			userId: string;
		}) => {
			const { error, ok } = await removeUserFromTeam(teamId, userId);

			if (error || !ok) {
				throw new Error(error ?? 'Failed to leave team');
			}

			return true;
		}
	});
