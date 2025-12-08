import React from 'react';
import { useRemoveTeamMutation } from './hooks';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { X } from 'lucide-react';

type AdminActionsProps = {
	teamId: string;
	teamName: string;
	onRemove: () => void;
};

export const RemoveTeamDialog = ({
	teamId,
	teamName,
	onRemove
}: AdminActionsProps) => {
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
			question={`Are you sure you want to remove the team "${teamName}"?`}
			triggerContent={<X />}
		/>
	);
};
