'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';
import {
	BoardItemUpdateOnlyDto,
	boardItemUpdateOnlySchema,
	type BoardItemDetailDto
} from '@/facades/board/schema';
import { updateBoardItemById } from '@/facades/board/board-item-facade';
import type { ConcreteEventListDto } from '@/facades/concrete_event/schema';

type EditBoardItemFormProps = {
	boardItem: BoardItemDetailDto;
	concreteEvents: ConcreteEventListDto[];
};

export const EditBoardItemForm = ({
	boardItem
}: EditBoardItemFormProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<BoardItemUpdateOnlyDto>({
		resolver: zodResolver(boardItemUpdateOnlySchema),
		defaultValues: {
			title: boardItem.title,
			content: boardItem.content,
			isPinned: boardItem.isPinned
		}
	});

	const onSubmit = async (values: BoardItemUpdateOnlyDto) => {
		setIsLoading(true);
		try {
			const result = await updateBoardItemById(boardItem.id, values);

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
				toast.success('Board item updated successfully!');
				router.push('/board');
			}
		} catch (error) {
			toast.error(`An unexpected error occurred: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
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
						className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{form.formState.errors.content && (
						<span className="mt-1 text-sm text-red-600">
							{form.formState.errors.content.message}
						</span>
					)}
				</div>

				<div className="flex gap-4 pt-4">
					<SubmitButton text="Update Board Item" isLoading={isLoading} />
					<button
						type="button"
						onClick={() => router.push('/board')}
						className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
					>
						Cancel
					</button>
				</div>
			</form>
		</FormProvider>
	);
};
