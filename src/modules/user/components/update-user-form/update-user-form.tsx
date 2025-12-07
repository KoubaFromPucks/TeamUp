'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import React from 'react';
import {
	UserListDto,
	UserUpdateCreateDto,
	userUpdateCreateSchema
} from '@/facades/user/schema';
import { useUpdateUserMutation } from './hooks';
import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';
import { useRouter } from 'next/navigation';
import { CardImage } from '@/components/card';
import { getImageUrlOrDefault } from '@/lib/utils';

export const UpdateUserForm = ({
	user,
	navPath
}: {
	user: UserListDto;
	navPath: string;
}) => {
	const form = useForm<UserUpdateCreateDto>({
		resolver: zodResolver(userUpdateCreateSchema),
		defaultValues: {
			name: user?.name ?? '',
			nickname: user?.nickname ?? '',
			email: user?.email ?? '',
			phoneNumber: user?.phoneNumber ?? '',
			imageUrl: user?.imageUrl
		}
	});

	const mutation = useUpdateUserMutation();
	const router = useRouter();

	const onSubmit = (values: UserUpdateCreateDto) => {
		mutation.mutate(
			{ data: values, id: user.id ?? '' },
			{
				onSuccess: data => {
					toast.success(`User '${data.name} updated successfully`);

					router.push(navPath);
				},
				onError: error => {
					toast.error(`User update failed: ${error.message}`);
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
						<FormInput name="nickname" label="Nickname" />
						<FormInput name="email" label="Email" />
						<FormInput name="phoneNumber" label="Phone Number" />
						<FormInput name="imageUrl" label="Image URL" />
					</div>
					<div className="flex items-center justify-center lg:w-1/2">
						<CardImage imageUrl={getImageUrlOrDefault(imageUrl)} size="large" />
					</div>
				</div>
				<div className="mt-3 w-full">
					<SubmitButton text="Update profile" isLoading={mutation.isPending} />
				</div>
			</form>
		</FormProvider>
	);
};
