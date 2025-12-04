import React from 'react';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { X } from 'lucide-react';
import { UserListDto } from '@/facades/user/schema';
import { toast } from 'sonner';
import { useRemoveUserFromTeamMutation } from '../hooks';

type RemoveMemberDialogProps = {
	member: UserListDto;
	teamId: string;
	onRemove: () => void;
};

export const RemoveMemberDialog = ({
	member,
	teamId,
	onRemove
}: RemoveMemberDialogProps) => {
	const mutation = useRemoveUserFromTeamMutation();

	const onRemoveMember = (userId: string) => {
		mutation.mutate(
			{ teamId: teamId, userId: userId },
			{
				onSuccess: () => {
					toast.success('Member has been removed from the team successfully');
					onRemove();
				},
				onError: error => {
					toast.error(`Failed to remove member: ${error.message}`);
				}
			}
		);
	};

	return (
		<ConfirmDialog
			onConfirm={() => onRemoveMember(member.id)}
			question={`Are you sure you want to remove ${member.name} (${member.nickname}) from team?`}
			triggerContent={<X />}
		/>
	);
};
