import { addUserToTeam, removeUserFromTeam } from '@/facades/team/team-facade';
import { getUserByMail } from '@/facades/user/user-facade';
import { useMutation } from '@tanstack/react-query';
import { deleteTeam } from '@/facades/team/team-facade';

export const useRemoveUserFromTeamMutation = () =>
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

export const useAddMemberToTeamMutation = () =>
	useMutation({
		mutationFn: async ({ teamId, mail }: { teamId: string; mail: string }) => {
			const { error: userError, user } = await getUserByMail(mail);
			if (userError || !user) {
				throw new Error(userError ?? 'User not found');
			}

			const { error, ok } = await addUserToTeam(teamId, user.id);
			if (error || !ok) {
				throw new Error(error ?? 'Failed to add member to team');
			}

			return true;
		}
	});

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
