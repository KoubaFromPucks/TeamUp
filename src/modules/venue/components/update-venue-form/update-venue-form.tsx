'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
	venueUpdateSchema,
	VenueUpdateDto,
	VenueDetailDto
} from '@/facades/venue/schema';
import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';
import { useRouter } from 'next/navigation';
import { useUpdateVenueMutation } from './hooks';

export const VenueForm = ({
	venue,
	navPath,
	ownerId
}: {
	venue?: VenueDetailDto;
	navPath: string;
	ownerId: string;
}) => {
	const isEdit = !!venue?.id;

	const form = useForm<VenueUpdateDto>({
		resolver: zodResolver(venueUpdateSchema),
		defaultValues: {
			name: venue?.name ?? '',
			address: venue?.address ?? '',
			gps: venue?.gps ?? null,
			description: venue?.description ?? null,
			pricePerHour: venue?.pricePerHour ?? 0,
			ownerId
		}
	});

	const mutation = useUpdateVenueMutation();
	const router = useRouter();

	const onSubmit = (values: VenueUpdateDto) => {
		mutation.mutate(
			{ data: values, id: venue?.id },
			{
				onSuccess: () => {
					toast.success('Venue saved successfully');
					router.push(navPath);
				},
				onError: e => toast.error(`Save failed: ${e.message}`)
			}
		);
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<input
					type="hidden"
					value={ownerId}
					{...form.register('ownerId')}
				/>

				<div className="flex flex-col gap-6">
					<FormInput name="name" label="Name" />
					<FormInput name="address" label="Address" />
					<FormInput name="gps" label="GPS" placeholder="50.xxxx, 14.xxxx" />
					<FormInput name="description" label="Description" />
					<FormInput name="pricePerHour" label="Price per hour" type="number" />
				</div>

				<div className="mt-3 w-full">
					<SubmitButton
						text={isEdit ? 'Update venue' : 'Create venue'}
						isLoading={mutation.isPending}
					/>
				</div>
			</form>
		</FormProvider>
	);
};
