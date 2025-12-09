'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardHeader, CardContent, CardLabeledItem } from '@/components/card';
import { StandardLink } from '@/components/standard-link';
import { UserPlus, X } from 'lucide-react';
import type { UserListDto } from '@/facades/user/schema';
import { useAddCoorganiserMutation, useRemoveCoorganiserMutation } from './hooks';

import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/facades/user/user-facade';

type CoorganisersCardProps = {
	eventId: string;
	coorganisers: UserListDto[];
	canManage: boolean;
};

export const CoorganisersCard = ({
	eventId,
	coorganisers,
	canManage
}: CoorganisersCardProps) => {
	const [selectedUserId, setSelectedUserId] = useState<string>('');

	const addMutation = useAddCoorganiserMutation(eventId);
	const removeMutation = useRemoveCoorganiserMutation(eventId);

	const { data: usersRes } = useQuery({
		queryKey: ['users-list'],
		queryFn: async () => {
			const { error, users } = await getAllUsers();
			if (error) throw new Error(String(error));
			return users ?? [];
		},
		enabled: canManage
	});

	const allUsers = usersRes ?? [];

	const coIds = useMemo(
		() => new Set(coorganisers.map(u => u.id)),
		[coorganisers]
	);

	const availableUsers = allUsers.filter(u => !coIds.has(u.id));

	const onAdd = () => {
		if (!selectedUserId) return;
		addMutation.mutate(selectedUserId, {
			onSuccess: () => setSelectedUserId('')
		});
	};

	return (
		<Card>
			<CardHeader className="flex items-center justify-between text-left">
				<h3 className="text-lg font-semibold">Co-organisers</h3>

				{canManage && (
					<div className="text-sm text-gray-600">
						{addMutation.isPending || removeMutation.isPending
							? 'Saving...'
							: null}
					</div>
				)}
			</CardHeader>

			<CardContent className="flex flex-col gap-4">
				{coorganisers.length === 0 ? (
					<p className="text-gray-500">
						No co-organisers yet
					</p>
				) : (
					<div className="flex flex-col gap-2">
						{coorganisers.map(u => (
							<div
								key={u.id}
								className="flex items-center justify-between rounded-lg border px-3 py-2"
							>
								<div className="flex items-center gap-2">
									<div className="font-medium">{u.name}</div>
									{u.nickname && (
										<div className="text-xs text-gray-500">
											({u.nickname})
										</div>
									)}
								</div>

								{canManage && (
									<button
										type="button"
										onClick={() => removeMutation.mutate(u.id)}
										className="rounded-md p-1 hover:bg-gray-100"
										aria-label="Remove co-organiser"
									>
										<X size={16} />
									</button>
								)}
							</div>
						))}
					</div>
				)}

				{canManage && (
					<div className="mt-2 flex items-end gap-2">
						<label className="flex w-full flex-col gap-1">
							<span className="text-sm font-medium">Add user</span>
							<select
								className="h-10 w-full rounded-md border px-3"
								value={selectedUserId}
								onChange={e => setSelectedUserId(e.target.value)}
							>
								<option value="">Select user…</option>
								{availableUsers.map(u => (
									<option key={u.id} value={u.id}>
										{u.name} {u.email ? `(${u.email})` : ''}
									</option>
								))}
							</select>
						</label>

						<button
							type="button"
							onClick={onAdd}
							disabled={!selectedUserId || addMutation.isPending}
							className="flex h-10 items-center gap-2 rounded-md border px-3 font-medium hover:bg-gray-50 disabled:opacity-50"
						>
							<UserPlus size={16} />
							Add
						</button>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
