'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Check, XCircle, HelpCircle } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './dialog/dialog';
import { Button } from './basic-components/button';
import { Card, CardContent } from './card/card';
import {
	getEventInvitationByUserId,
	createUpdateEventInvitation
} from '@/facades/event_invitation/event-invitation-facade';
import { toast } from 'sonner';
import type { EventInvitationListDto } from '@/facades/event_invitation/schema';

interface NotificationBellProps {
	userId: string;
}

export const NotificationBell = ({ userId }: NotificationBellProps) => {
	const [invitations, setInvitations] = useState<EventInvitationListDto[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [updatingId, setUpdatingId] = useState<string | null>(null);

	const pendingCount = invitations.filter(
		inv => inv.state === 'Pending'
	).length;

	const loadInvitations = async () => {
		setIsLoading(true);
		try {
			const { eventInvitation, error } =
				await getEventInvitationByUserId(userId);
			if (error) {
				toast.error('Failed to load invitations');
			} else if (eventInvitation) {
				setInvitations(eventInvitation);
			}
		} catch (err) {
			toast.error('An error occurred while loading invitations');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadInvitations();
	}, [userId]);

	useEffect(() => {
		if (isOpen) {
			loadInvitations();
		}
	}, [isOpen]);

	const handleUpdateInvitation = async (
		invitation: EventInvitationListDto,
		newState: 'Accepted' | 'Declined' | 'Not sure'
	) => {
		setUpdatingId(invitation.id);
		try {
			const { error } = await createUpdateEventInvitation(invitation.id, {
				concreteEventId: invitation.concreteEventId,
				userId: invitation.userId,
				state: newState
			});

			if (error) {
				toast.error('Failed to update invitation');
			} else {
				setInvitations(prev =>
					prev.map(inv =>
						inv.id === invitation.id ? { ...inv, state: newState } : inv
					)
				);
				toast.success(`Invitation ${newState.toLowerCase()}`);
			}
		} catch (err) {
			toast.error('An error occurred');
		} finally {
			setUpdatingId(null);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="relative rounded-xl p-2 hover:bg-gray-300"
				>
					<Bell className="!size-6 h-6 w-6" />
					{pendingCount > 0 && (
						<span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
							{pendingCount}
						</span>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Event Invitations</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					{isLoading ? (
						<div className="flex justify-center py-8">
							<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
						</div>
					) : invitations.length === 0 ? (
						<Card>
							<CardContent>
								<p className="py-4 text-center text-gray-500">No invitations</p>
							</CardContent>
						</Card>
					) : (
						invitations.map(invitation => (
							<Card key={invitation.id}>
								<CardContent>
									<div className="flex items-start gap-4">
										<div className="flex-1 space-y-2">
											<div>
												<h3 className="text-lg font-semibold">
													{invitation.concreteEvent?.eventName || 'Event'}
												</h3>
												{invitation.concreteEvent && (
													<>
														<p className="text-sm text-gray-600">
															<span className="font-medium">Start:</span>{' '}
															{new Date(
																invitation.concreteEvent.startDate
															).toLocaleDateString('en-US', {
																weekday: 'long',
																year: 'numeric',
																month: 'long',
																day: 'numeric',
																hour: '2-digit',
																minute: '2-digit'
															})}
														</p>
														<p className="text-sm text-gray-600">
															<span className="font-medium">End:</span>{' '}
															{new Date(
																invitation.concreteEvent.endDate
															).toLocaleDateString('en-US', {
																weekday: 'long',
																year: 'numeric',
																month: 'long',
																day: 'numeric',
																hour: '2-digit',
																minute: '2-digit'
															})}
														</p>
														{invitation.concreteEvent.price !== null && (
															<p className="text-sm text-gray-600">
																<span className="font-medium">Price:</span> $
																{invitation.concreteEvent.price.toFixed(2)}
															</p>
														)}
													</>
												)}
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm text-gray-700">Status:</span>
												<span
													className={`text-sm font-medium ${
														invitation.state === 'Accepted'
															? 'text-green-600'
															: invitation.state === 'Declined'
																? 'text-red-600'
																: invitation.state === 'Pending'
																	? 'text-yellow-600'
																	: 'text-gray-500'
													}`}
												>
													{invitation.state}
												</span>
											</div>
											{invitation.state === 'Pending' && (
												<div className="flex flex-wrap gap-2 pt-2">
													<Button
														onClick={() =>
															handleUpdateInvitation(invitation, 'Accepted')
														}
														disabled={updatingId === invitation.id}
														size="sm"
														className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
													>
														<Check className="h-4 w-4" />
														Accept
													</Button>
													<Button
														onClick={() =>
															handleUpdateInvitation(invitation, 'Declined')
														}
														disabled={updatingId === invitation.id}
														size="sm"
														variant="destructive"
														className="flex items-center gap-1"
													>
														<XCircle className="h-4 w-4" />
														Decline
													</Button>
													<Button
														onClick={() =>
															handleUpdateInvitation(invitation, 'Not sure')
														}
														disabled={updatingId === invitation.id}
														size="sm"
														variant="secondary"
														className="flex items-center gap-1"
													>
														<HelpCircle className="h-4 w-4" />
														Not Sure
													</Button>
												</div>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
