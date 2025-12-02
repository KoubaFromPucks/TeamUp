import { addUserToTeam, removeUserFromTeam } from '@/facades/team/team-facade';
import { getUserByMail } from '@/facades/user/user-facade';
import { useMutation } from '@tanstack/react-query';

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
			console.log('Fetched user by mail:', user, 'with error:', userError);
			console.log('Team id:', teamId, 'Mail:', mail);
			if (userError || !user) {
				console.log('User not found or error occurred while fetching user.');
				throw new Error(userError ?? 'User not found');
			}

			const { error, ok } = await addUserToTeam(teamId, user.id);
			if (error || !ok) {
				throw new Error(error ?? 'Failed to add member to team');
			}

			return true;
		}
	});
