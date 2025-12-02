'use client';

import React from 'react';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle
} from '@/components/dialog/dialog';
import { Button } from '@/components/basic-components/button';
import { useState } from 'react';

type ConfirmDialogProps = {
	onConfirm: () => void;
	question: string;
	confirmVariant?: 'destructive' | 'default';
	triggerContent?: React.ReactNode;
};

export const ConfirmDialog = ({
	onConfirm,
	question,
	confirmVariant = 'destructive',
	triggerContent
}: ConfirmDialogProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive" className="ml-2">
					{triggerContent}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>{question}</DialogTitle>

				<div className="flex justify-end gap-4">
					<Button variant="secondary" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						variant={confirmVariant}
						onClick={() => {
							onConfirm();
							setOpen(false);
						}}
					>
						Confirm
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
