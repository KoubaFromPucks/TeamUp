'use server';

import { getAllConcreteEvents } from '@/facades/concrete_event/concrete-event-facade';
import { getEventInvitationByUserId } from '@/facades/event_invitation/event-invitation-facade';

export const getInvitedEventIdsForUser = async (userId: string) => {
	const [
		{ error: ceError, concreteEvent },
		{ error: invError, eventInvitation }
	] = await Promise.all([
		getAllConcreteEvents(),
		getEventInvitationByUserId(userId)
	]);

	if (ceError || invError || !concreteEvent || !eventInvitation) {
		return new Set<string>();
	}

	const ceToEventId = new Map<string, string>();
	concreteEvent.forEach(ce => {
		ceToEventId.set(ce.id, ce.eventId);
	});

	const invitedEventIds = new Set<string>();
	eventInvitation.forEach(inv => {
		const eventId = ceToEventId.get(inv.concreteEventId);
		if (eventId) invitedEventIds.add(eventId);
	});

	return invitedEventIds;
};
