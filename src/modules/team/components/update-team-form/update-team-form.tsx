'use client';

import React from 'react';
import {
	TeamDetailDto,
	TeamUpdateCreateDto,
	teamUpdateCreateSchema
} from '@/facades/team/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { FormInput } from '@/components/form/form-input';
import { useUpdateTeamMutation } from './hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CardImage } from '@/components/card';
import { SubmitButton } from '@/components/form/submit-button';
import { FormSelect } from '@/components/form/form-select';
import { getImageUrlOrDefault } from '@/lib/utils';

export const UpdateTeamForm = ({
	team,
	navPath,
	update,
	organizerId
}: {
	team: TeamDetailDto | null;
	navPath: string;
	update: boolean;
	organizerId: string;
}) => {
	const form = useForm<TeamUpdateCreateDto>({
		resolver: zodResolver(teamUpdateCreateSchema),
		defaultValues: {
			name: team?.name ?? '',
			desc: team?.desc ?? '',
			imageUrl: team?.imageUrl ?? undefined,
			organizerId: organizerId
		}
	});

	const mutation = useUpdateTeamMutation();
	const router = useRouter();

	const onSubmit = (values: TeamUpdateCreateDto) => {
		mutation.mutate(
			{ data: values, id: team?.id ?? '' },
			{
				onSuccess: () => {
					toast.success('Team updated successfully');
					router.push(navPath);
				},
				onError: error => {
					toast.error(`Team update failed: ${error.message}`);
				}
			}
		);
	};

	const imageUrl = form.watch('imageUrl');

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex flex-col gap-10 lg:flex-row">
					<div className="lg:w-1/2">
						<FormInput name="name" label="Name" />
						<FormInput name="desc" label="Description" />
						<FormInput name="imageUrl" label="Image URL" />
						{update && (
							<FormSelect name="organizerId" label="Organizer">
								{team?.members.map(member => (
									<option key={member.id} value={member.id}>
										{member.name} ({member.email})
									</option>
								))}
							</FormSelect>
						)}
					</div>
					<div className="flex items-center justify-center lg:w-1/2">
						<CardImage imageUrl={getImageUrlOrDefault(imageUrl)} size="large" />
					</div>
				</div>
				<div className="mt-3 w-full">
					<SubmitButton
						text={update ? 'Update team' : 'Create team'}
						isLoading={mutation.isPending}
					/>
				</div>
			</form>
		</FormProvider>
	);
};
