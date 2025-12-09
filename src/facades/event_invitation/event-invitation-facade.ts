'use server';
import { eventInvitationService } from '@/services/event_invitation/event-invitation-service';
import { eventInvitationMapper } from './mapper';
import {
	EventInvitationUpdateDto,
	eventInvitationUpdateSchema
} from './schema';

export const createUpdateEventInvitation = async (
	eventInvitationId: string | undefined,
	eventInvitation: EventInvitationUpdateDto
) => {
	const validationResult =
		eventInvitationUpdateSchema.safeParse(eventInvitation);

	if (!validationResult.success) {
		const errors = validationResult.error.flatten().fieldErrors;
		return { error: errors, eventInvitation: null };
	}

	const insertEventInvitationModel =
		eventInvitationMapper.mapDtoToEventInvitationInsertModel(
			validationResult.data
		);
	let result;
	try {
		if (eventInvitationId) {
			result = await eventInvitationService.updateEventInvitation(
				eventInvitationId,
				insertEventInvitationModel
			);
		} else {
			result = await eventInvitationService.createEventInvitation(
				insertEventInvitationModel
			);
		}
	} catch (error) {
		return { error: (error as Error).message, eventInvitation: null };
	}

	return {
		error: null,
		eventInvitation:
			eventInvitationMapper.mapEventInvitationListModelToDto(result)
	};
};

export const getEventInvitationById = async (eventInvitationId: string) => {
	try {
		const result =
			await eventInvitationService.getEventInvitationById(eventInvitationId);
		if (!result) {
			return { error: 'Event invitation not found', eventInvitation: null };
		}
		return {
			error: null,
			eventInvitation:
				eventInvitationMapper.mapEventInvitationDetailModelToDTO(result)
		};
	} catch (error) {
		return { error: (error as Error).message, eventInvitation: null };
	}
};

export const getEventInvitationByConcreteEventId = async (
	concreteEventId: string
) => {
	try {
		const result =
			await eventInvitationService.getEventInvitationsByConcreteEventId(
				concreteEventId
			);
		if (!result) {
			return { error: 'Event invitations not found', eventInvitation: null };
		}
		return {
			error: null,
			eventInvitations: result.map(
				eventInvitationMapper.mapEventInvitationListModelToDto
			)
		};
	} catch (error) {
		return { error: (error as Error).message, eventInvitation: null };
	}
};

export const getEventInvitationByUserId = async (userId: string) => {
	try {
		const result =
			await eventInvitationService.getEventInvitationsByUserId(userId);
		if (!result) {
			return { error: 'Event invitation not found', eventInvitation: null };
		}
		return {
			error: null,
			eventInvitation: result.map(
				eventInvitationMapper.mapEventInvitationListModelToDto
			)
		};
	} catch (error) {
		return { error: (error as Error).message, eventInvitation: null };
	}
};

export const getAllEventInvitation = async () => {
	try {
		const result = await eventInvitationService.getAllEventInvitations();
		if (!result) {
			return { error: 'Event invitation not found', eventInvitation: null };
		}
		return {
			error: null,
			eventInvitation: result.map(
				eventInvitationMapper.mapEventInvitationListModelToDto
			)
		};
	} catch (error) {
		return { error: (error as Error).message, eventInvitation: null };
	}
};

export const deleteEventInvitation = async (eventInvitationId: string) => {
	try {
		const result =
			await eventInvitationService.deleteEventInvitation(eventInvitationId);
		if (!result) {
			return { error: 'Event invitation could not be deleted', ok: false };
		}
		return { error: null, ok: true };
	} catch (error) {
		return { error: (error as Error).message, ok: false };
	}
};

export const inviteTeamMembers = async (
	concreteEventId: string,
	teamId: string
) => {
	try {
		const { teamService } = await import('@/services/team/team-service');
		const team = await teamService.getTeamWithMembersById(teamId);

		if (!team) {
			return { error: 'Team not found', count: 0 };
		}

		const existingInvitations =
			await eventInvitationService.getEventInvitationsByConcreteEventId(
				concreteEventId
			);
		const invitedUserIds = new Set(existingInvitations.map(inv => inv.userId));

		const membersToInvite = team.members.filter(
			member => !invitedUserIds.has(member.id)
		);

		if (membersToInvite.length === 0) {
			return {
				error: 'All team members are already invited',
				count: 0
			};
		}

		const results = await Promise.allSettled(
			membersToInvite.map(member =>
				eventInvitationService.createEventInvitation({
					concreteEventId,
					userId: member.id,
					state: 'Pending'
				})
			)
		);

		const successfulInvitations = results
			.map((result, index) => {
				if (result.status === 'fulfilled') {
					return {
						invitation: result.value,
						member: membersToInvite[index]
					};
				}
				return null;
			})
			.filter((item): item is NonNullable<typeof item> => item !== null);

		const invitedUsers = successfulInvitations.map(({ invitation, member }) =>
			eventInvitationMapper.mapEventInvitationListModelToDto({
				...invitation,
				user: member
			})
		);

		const successCount = successfulInvitations.length;
		const failedCount = results.filter(r => r.status === 'rejected').length;
		const skippedCount = team.members.length - membersToInvite.length;

		if (failedCount > 0) {
			const message =
				skippedCount > 0
					? `Invited ${successCount} members, ${failedCount} failed, ${skippedCount} already invited`
					: `Invited ${successCount} members, but ${failedCount} failed`;
			return {
				error: message,
				count: successCount,
				invitedUsers
			};
		}

		if (skippedCount > 0) {
			return {
				error: null,
				count: successCount,
				message: `Invited ${successCount} new members (${skippedCount} were already invited)`,
				invitedUsers
			};
		}

		return { error: null, count: successCount, invitedUsers };
	} catch (error) {
		return { error: (error as Error).message, count: 0 };
	}
};
