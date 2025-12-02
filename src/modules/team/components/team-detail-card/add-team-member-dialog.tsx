'use client';

import React from 'react';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle
} from '@/components/basic-components/dialog';
import { Button } from '@/components/basic-components/button';
import { useState } from 'react';
import { BasicInput } from '@/components/basic-components/basic-input';
import { useAddMemberToTeamMutation } from './hooks';
import { toast } from 'sonner';

export const AddTeamMemberDialog = ({
	onSuccess,
	teamId
}: {
	onSuccess: () => void;
	teamId: string;
}) => {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');

	const mutation = useAddMemberToTeamMutation();

	const onClickAdd = () => {
		mutation.mutate(
			{ teamId: teamId, mail: email },
			{
				onSuccess: () => {
					toast.success('Member added successfully');
					setOpen(false);
					setEmail('');
					onSuccess();
				},
				onError: error => {
					toast.error(`Failed to add member: ${error.message}`);
				}
			}
		);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="mb-1 w-full">Add member</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Add Team Member</DialogTitle>
				<BasicInput
					placeholder="Enter member's email"
					className="mt-4 mb-6 w-full"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<div className="flex justify-end gap-4">
					<Button variant="secondary" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={onClickAdd}>Add Member</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
