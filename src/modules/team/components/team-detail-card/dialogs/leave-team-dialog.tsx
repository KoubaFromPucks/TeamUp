import React from 'react';
import { useRemoveUserFromTeamMutation } from '../hooks';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';

type LeaveTeamDialogProps = {
	teamId: string;
	userId: string;
	onLeave: () => void;
};

export const LeaveTeamDialog = ({
	teamId,
	userId,
	onLeave
}: LeaveTeamDialogProps) => {
	const leaveTeamMutation = useRemoveUserFromTeamMutation();

	const onLeaveTeam = () => {
		leaveTeamMutation.mutate(
			{ teamId: teamId, userId: userId },
			{
				onSuccess: () => {
					toast.success('You have left the team successfully');
					onLeave();
				},
				onError: error => {
					toast.error(`Failed to leave team: ${error.message}`);
				}
			}
		);
	};

	return (
		<ConfirmDialog
			onConfirm={onLeaveTeam}
			question="Are you sure you want to leave the team?"
			triggerContent="Leave Team"
		/>
	);
};
