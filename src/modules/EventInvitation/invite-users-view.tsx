'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/card/card';
import { Button } from '@/components/basic-components/button';
import { BasicInput } from '@/components/basic-components/basic-input';
import {
	createUpdateEventInvitation,
	deleteEventInvitation
} from '@/facades/event_invitation/event-invitation-facade';
import { CardImage } from '@/components/card/card-image';
import { getImageUrlOrDefault } from '@/lib/utils';
import {
	Search,
	Plus,
	Check,
	Trash2,
	XCircle,
	Clock,
	HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';
import React from 'react';
import type { UserListDto } from '@/facades/user/schema';
import type { EventInvitationListDto } from '@/facades/event_invitation/schema';
import type { InviteState } from '@/db/schema/enums/inviteState';

interface InviteUsersViewProps {
	concreteEventId: string;
	allUsers: UserListDto[];
	invitedUsers: EventInvitationListDto[];
}

export const InviteUsersView = ({
	concreteEventId,
	allUsers,
	invitedUsers: initialInvitedUsers
}: InviteUsersViewProps) => {
	const [invitedUsers, setInvitedUsers] = useState(initialInvitedUsers);
	const [searchTerm, setSearchTerm] = useState('');
	const [isInviting, setIsInviting] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState<string | null>(null);

	const stateConfig: Record<
		InviteState,
		{
			icon: React.ComponentType<{ className?: string }>;
			className: string;
			label: string;
		}
	> = {
		'Accepted': {
			icon: Check,
			className: 'text-green-600',
			label: 'Accepted'
		},
		'Declined': {
			icon: XCircle,
			className: 'text-red-600',
			label: 'Declined'
		},
		'Pending': {
			icon: Clock,
			className: 'text-yellow-600',
			label: 'Pending'
		},
		'Not sure': {
			icon: HelpCircle,
			className: 'text-gray-500',
			label: 'Not sure'
		}
	};

	const invitedUserIds = new Set(invitedUsers.map(inv => inv.userId));

	const filteredAllUsers = allUsers.filter(
		user =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const uninvitedUsers = filteredAllUsers.filter(user => {
		const isInvited = invitedUserIds.has(user.id);
		return !isInvited;
	});
	const currentlyInvitedUsers = invitedUsers.filter(
		inv =>
			inv.user &&
			(inv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				inv.user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
				inv.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	const handleInviteUser = async (user: UserListDto) => {
		setIsInviting(user.id);

		try {
			const { error, eventInvitation } = await createUpdateEventInvitation(
				undefined,
				{
					concreteEventId,
					userId: user.id,
					state: 'Pending'
				}
			);

			if (error || !eventInvitation) {
				const errorMsg =
					typeof error === 'string' ? error : 'Failed to send invitation';
				toast.error(errorMsg);
				return;
			}

			const newInvitation: EventInvitationListDto = {
				id: eventInvitation.id,
				concreteEventId,
				userId: user.id,
				state: 'Pending',
				user: user,
				concreteEvent: undefined
			};

			setInvitedUsers(prev => [...prev, newInvitation]);
			toast.success(`Invitation sent to ${user.name}`);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'An unexpected error occurred';
			toast.error(errorMessage);
		} finally {
			setIsInviting(null);
		}
	};

	const handleDeleteInvitation = async (invitation: EventInvitationListDto) => {
		if (
			!confirm(
				`Are you sure you want to delete the invitation for ${invitation.user?.name}?`
			)
		) {
			return;
		}

		setIsDeleting(invitation.id);

		try {
			const { error } = await deleteEventInvitation(invitation.id);

			if (error) {
				toast.error(`Failed to delete invitation: ${error}`);
				return;
			}

			setInvitedUsers(prev => prev.filter(inv => inv.id !== invitation.id));
			toast.success(
				`Invitation for ${invitation.user?.name} deleted successfully`
			);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'An unexpected error occurred';
			toast.error(errorMessage);
		} finally {
			setIsDeleting(null);
		}
	};

	console.log('Invited users:', invitedUsers);
	console.log('Currently invited users:', currentlyInvitedUsers);

	return (
		<div className="space-y-6">
			<Card>
				<CardContent>
					<div className="flex items-center gap-4">
						<Search className="h-5 w-5 text-gray-400" />
						<BasicInput
							type="text"
							placeholder="Search users by name, nickname, or email..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div>
					<h2 className="mb-4 text-xl font-semibold text-gray-800">
						Available Users ({uninvitedUsers.length})
					</h2>
					<div className="max-h-96 space-y-4 overflow-y-auto">
						{uninvitedUsers.length === 0 ? (
							<Card>
								<CardContent>
									<p className="py-4 text-center text-gray-500">
										{searchTerm
											? 'No users found matching your search'
											: 'All users have been invited'}
									</p>
								</CardContent>
							</Card>
						) : (
							uninvitedUsers.map(user => (
								<Card key={user.id}>
									<CardContent>
										<div className="flex items-center gap-4">
											<CardImage
												imageUrl={getImageUrlOrDefault(user.imageUrl)}
												size="small"
											/>
											<div className="flex-1">
												<h3 className="font-semibold">{user.name}</h3>
												<p className="text-sm text-gray-600">
													@{user.nickname}
												</p>
												<p className="text-sm text-gray-500">{user.email}</p>
											</div>
											<Button
												onClick={() => handleInviteUser(user)}
												disabled={isInviting === user.id}
												className="flex items-center gap-2"
											>
												{isInviting === user.id ? (
													<>
														<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
														Inviting...
													</>
												) : (
													<>
														<Plus className="h-4 w-4" />
														Invite
													</>
												)}
											</Button>
										</div>
									</CardContent>
								</Card>
							))
						)}
					</div>
				</div>

				<div>
					<h2 className="mb-4 text-xl font-semibold text-gray-800">
						Invited Users ({currentlyInvitedUsers.length})
					</h2>
					<div className="max-h-96 space-y-4 overflow-y-auto">
						{currentlyInvitedUsers.length === 0 ? (
							<Card>
								<CardContent>
									<p className="py-4 text-center text-gray-500">
										{searchTerm
											? 'No invited users match your search'
											: 'No users have been invited yet'}
									</p>
								</CardContent>
							</Card>
						) : (
							currentlyInvitedUsers.map(invitation => (
								<Card key={invitation.id}>
									<CardContent>
										<div className="flex items-center gap-4">
											<CardImage
												imageUrl={getImageUrlOrDefault(
													invitation.user?.imageUrl
												)}
												size="small"
											/>
											<div className="flex-1">
												<h3 className="font-semibold">
													{invitation.user?.name}
												</h3>
												<p className="text-sm text-gray-600">
													@{invitation.user?.nickname}
												</p>
												<p className="text-sm text-gray-500">
													{invitation.user?.email}
												</p>
											</div>
											<div className="flex items-center gap-2">
												{(() => {
													const config = stateConfig[invitation.state];
													const Icon = config.icon;
													return (
														<div
															className={`flex items-center gap-2 ${config.className}`}
														>
															<Icon className="h-4 w-4" />
															<span className="text-sm font-medium">
																{config.label}
															</span>
														</div>
													);
												})()}
												<Button
													onClick={() => handleDeleteInvitation(invitation)}
													disabled={isDeleting === invitation.id}
													variant="ghost"
													size="icon"
													className="h-8 w-8 hover:bg-red-100"
													title="Delete invitation"
												>
													<Trash2 className="h-4 w-4 text-red-600" />
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
