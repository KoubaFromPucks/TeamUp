import React from 'react';
import { useRemoveTeamMutation } from '../hooks';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';

type AdminActionsProps = {
	teamId: string;
	onRemove: () => void;
};

export const RemoveTeamDialog = ({ teamId, onRemove }: AdminActionsProps) => {
	const removeTeamMutation = useRemoveTeamMutation();

	const onRemoveTeam = () => {
		removeTeamMutation.mutate(
			{ teamId: teamId },
			{
				onSuccess: () => {
					toast.success('Team has been deleted successfully');
					onRemove();
				},
				onError: error => {
					toast.error(`Failed to delete team: ${error.message}`);
				}
			}
		);
	};

	return (
		<ConfirmDialog
			onConfirm={() => onRemoveTeam()}
			question="Are you sure you want to remove the team?"
			triggerContent="Delete Team"
		/>
	);
};
