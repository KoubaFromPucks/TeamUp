'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
	concreteEventUpdateSchema,
	ConcreteEventUpdateDto,
	ConcreteEventDetailDto
} from '@/facades/concrete_event/schema';
import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';
import { useRouter } from 'next/navigation';
import { useUpdateConcreteEventMutation } from './hooks';
import React from 'react';

export const ConcreteEventForm = ({
	concreteEvent,
	navPath,
	eventId
}: {
	concreteEvent?: ConcreteEventDetailDto;
	navPath: string;
	eventId: string;
}) => {
	const isEdit = !!concreteEvent?.id;

	const form = useForm<ConcreteEventUpdateDto>({
		resolver: zodResolver(concreteEventUpdateSchema),
		defaultValues: {
			eventId: eventId,
			startDate: concreteEvent?.startDate
				? concreteEvent.startDate.replace(' ', 'T').slice(0, 16)
				: undefined,
			endDate: concreteEvent?.endDate
				? concreteEvent.endDate.replace(' ', 'T').slice(0, 16)
				: undefined,
			price: concreteEvent?.price ?? null
		}
	});

	const mutation = useUpdateConcreteEventMutation();
	const router = useRouter();

	const onSubmit = (values: ConcreteEventUpdateDto) => {
		const dataToSend = {
			...values,
			startDate: values.startDate.replace('T', ' '),
			endDate: values.endDate.replace('T', ' ')
		};
		mutation.mutate(
			{ data: dataToSend, id: concreteEvent?.id ?? '' },
			{
				onSuccess: () => {
					toast.success('Concrete event saved successfully');
					router.push(navPath);
				},
				onError: error => toast.error(`Save failed: ${error.message}`)
			}
		);
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex flex-col gap-10">
					<FormInput
						name="startDate"
						label="Start date"
						type="datetime-local"
					/>

					<FormInput name="endDate" label="End date" type="datetime-local" />

					<FormInput name="price" label="Price" type="number" />
				</div>

				<div className="mt-3 w-full">
					<SubmitButton
						text={isEdit ? 'Update event' : 'Create event'}
						isLoading={mutation.isPending}
					/>
				</div>
			</form>
		</FormProvider>
	);
};
