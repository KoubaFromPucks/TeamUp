'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
	eventUpdateSchema,
	EventUpdateDto,
	EventDetailDto,
	pricingTypeEnum,
	inviteTypeEnum,
	dayOfWeekEnum
} from '@/facades/event/schema';
import { FormInput } from '@/components/form/form-input';
import { FormSelect } from '@/components/form/form-select';
import { SubmitButton } from '@/components/form/submit-button';
import { useRouter } from 'next/navigation';
import { useUpdateEventMutation } from './hooks';
import {
	dayOfWeekLabels,
	inviteTypeLabels,
	pricingTypeLabels
} from './update-event-form-enums';

type VenueOption = { id: string; name: string };

export const EventForm = ({
	event,
	navPath,
	organisatorId,
	venues
}: {
	event?: EventDetailDto;
	navPath: string;
	organisatorId: string;
	venues: VenueOption[];
}) => {
	const isEdit = !!event?.id;

	const form = useForm<EventUpdateDto>({
		resolver: zodResolver(eventUpdateSchema),
		defaultValues: {
			venueId: event?.venueId ?? venues[0]?.id ?? '',
			organisatorId,
			name: event?.name ?? '',
			startTime: event?.startTime ?? '',
			endTime: event?.endTime ?? '',
			dayOfWeek: event?.dayOfWeek ?? 'Mon',
			inviteType: event?.inviteType ?? 'public',
			pricingType: event?.pricingType ?? 'pay_as_you_go',
			totalPrice: event?.totalPrice ?? null
		}
	});

	const mutation = useUpdateEventMutation();
	const router = useRouter();

	const onSubmit = (values: EventUpdateDto) => {
		mutation.mutate(
			{ data: values, id: event?.id },
			{
				onSuccess: () => {
					toast.success('Event saved successfully');
					router.push(navPath);
				},
				onError: error => toast.error(`Save failed: ${error.message}`)
			}
		);
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<input
					type="hidden"
					value={organisatorId}
					{...form.register('organisatorId')}
				/>

				<div className="flex flex-col gap-6">
					<FormInput name="name" label="Name" />

					<FormSelect name="venueId" label="Venue">
						{venues.length === 0 ? (
							<option value="" disabled>
								No venues
							</option>
						) : (
							venues.map(v => (
								<option key={v.id} value={v.id}>
									{v.name}
								</option>
							))
						)}
					</FormSelect>

					<FormInput name="startTime" label="Start time" type="time" />
					<FormInput name="endTime" label="End time" type="time" />

					<FormSelect name="dayOfWeek" label="Day of week">
						{dayOfWeekEnum.map(d => (
							<option key={d} value={d}>
								{dayOfWeekLabels[d]}
							</option>
						))}
					</FormSelect>

					<FormSelect name="inviteType" label="Invite type">
						{inviteTypeEnum.map(i => (
							<option key={i} value={i}>
								{inviteTypeLabels[i]}
							</option>
						))}
					</FormSelect>

					<FormSelect name="pricingType" label="Pricing type">
						{pricingTypeEnum.map(p => (
							<option key={p} value={p}>
								{pricingTypeLabels[p]}
							</option>
						))}
					</FormSelect>

					<FormInput name="totalPrice" label="Total price" type="number" />
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
