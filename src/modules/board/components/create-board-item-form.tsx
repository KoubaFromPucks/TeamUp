'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';
import { Button } from '@/components/basic-components/button';
import {
	BoardItemCreateUpdateDto,
	boardItemCreateUpdateSchema
} from '@/facades/board/schema';
import { createBoardItem } from '@/facades/board/board-item-facade';
import type { EventListModel } from '@/services/event/schema';

type CreateBoardItemFormProps = {
	userId: string;
	events: EventListModel[];
	preselectedEventId?: string;
	redirectUrl: string;
};

export const CreateBoardItemForm = ({
	userId,
	events,
	preselectedEventId,
	redirectUrl
}: CreateBoardItemFormProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<BoardItemCreateUpdateDto>({
		resolver: zodResolver(boardItemCreateUpdateSchema),
		defaultValues: {
			authorId: userId,
			eventId: preselectedEventId ?? events[0]?.id ?? '',
			title: '',
			content: '',
			isPinned: false
		}
	});

	const onSubmit = async (values: BoardItemCreateUpdateDto) => {
		setIsLoading(true);
		try {
			const result = await createBoardItem(values);

			if (result.error) {
				if (typeof result.error === 'string') {
					toast.error(result.error);
				} else {
					// Handle field errors
					Object.entries(result.error).forEach(([field, messages]) => {
						if (messages && messages.length > 0) {
							toast.error(`${field}: ${messages.join(', ')}`);
						}
					});
				}
			} else {
				toast.success('Board item created successfully!');
				router.push(redirectUrl);
			}
		} catch (error) {
			toast.error(`An unexpected error occurred: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};

	if (events.length === 0) {
		return (
			<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
				<p className="text-yellow-800">
					No events available. Please create an event first before creating a
					board item.
				</p>
			</div>
		);
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="max-w-2xl space-y-6"
			>
				<FormInput
					name="title"
					label="Title"
					placeholder="Enter board item title"
					className="w-full"
				/>

				<div>
					<label htmlFor="content" className="mb-2 block">
						Content
					</label>
					<textarea
						{...form.register('content')}
						id="content"
						rows={6}
						placeholder="Enter board item content"
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
					{form.formState.errors.content && (
						<span className="mt-1 text-sm text-red-600">
							{form.formState.errors.content.message}
						</span>
					)}
				</div>

				<FormInput
					name="eventId"
					label="Event"
					value={
						events.find(e => e.id === form.watch('eventId'))?.name ??
						'Unknown Event'
					}
					disabled
					className="w-full bg-gray-50"
				/>

				<div className="flex gap-4 pt-4">
					<SubmitButton text="Create Board Item" isLoading={isLoading} />
					<Button
						type="button"
						onClick={() => router.push('/board')}
						variant="outline"
					>
						Cancel
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
