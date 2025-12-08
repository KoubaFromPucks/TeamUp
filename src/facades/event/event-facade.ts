'use server';

import { eventService } from '@/services/event/service';
import { venueService } from '@/services/venue/service';
import { eventFacadeMapper } from './mapper';
import {
	EventUpdateDto,
	eventUpdateSchema,
	type EventDetailDto,
	type EventListDto
} from './schema';
import { concreteEventService } from '@/services/concrete_event/concrete-event-service';
import { getBoardItemsByEventId } from '../board/board-item-facade';
import { init } from 'next/dist/compiled/webpack/webpack';

type GetEventsListArgs = {
	userId?: string | null;
	invitedEventIds?: Set<string> | string[];
};

export const getEventsList = async ({
	userId,
	invitedEventIds
}: GetEventsListArgs = {}) => {
	try {
		const events = await eventService.getAllEvents();

		if (!events) {
			return { error: 'Events not found', events: null };
		}

		const invitedSet =
			invitedEventIds instanceof Set
				? invitedEventIds
				: new Set(invitedEventIds ?? []);

		const visible = events.filter(e => {
			if (e.inviteType === 'public') return true;
			if (!userId) return false;
			if (e.organisatorId === userId) return true;
			if (e.inviteType === 'private') return true;
			if (e.inviteType === 'invite_only') return invitedSet.has(e.id);
			return false;
		});

		const venues = await venueService.getAllVenues();
		const venueMap = new Map<string, string>();
		venues.forEach(v => venueMap.set(v.id, v.name));

		const mapped: EventListDto[] = visible.map(e => ({
			...eventFacadeMapper.mapListModelToDto(e),
			venueName: venueMap.get(e.venueId) ?? null
		}));

		return { error: null, events: mapped };
	} catch (error) {
		return { error: (error as Error).message, events: null };
	}
};

export const getEventById = async (eventId: string) => {
	try {
		const [event, 
			{ error: biError, boardItems: initialBoardItems }, 
			concreteEvents
		] = await Promise.all([
			eventService.getEventById(eventId),
			getBoardItemsByEventId(eventId),
			concreteEventService.getConcreteEventsByEventId(eventId)
		]);

		console.log(initialBoardItems);

		if (!event) {
			return { error: 'Event not found', event: null };
		}

		let boardItems = initialBoardItems ?? undefined;
		if (biError) {
			boardItems = [];
		}

		const dto: EventDetailDto = eventFacadeMapper.mapDetailModelToDto(event, {
			boardItems,
			concreteEvents
		});

		return { error: null, event: dto };
	} catch (error) {
		return { error: (error as Error).message, event: null };
	}
};

export const deleteEvent = async (eventId: string) => {
	try {
		const result = await eventService.deleteEventById(eventId);

		if (!result) {
			return { error: 'Event could not be deleted', ok: false };
		}

		return { error: null, ok: true };
	} catch (error) {
		return { error: (error as Error).message, ok: false };
	}
};

export const createUpdateEvent = async (
	eventId: string | undefined,
	event: EventUpdateDto
) => {
	const validationResult = eventUpdateSchema.safeParse(event);

	if (!validationResult.success) {
		const errors = validationResult.error.flatten().fieldErrors;
		return { error: errors, event: null };
	}

	const insertModel = eventFacadeMapper.mapUpdateDtoToInsertModel(
		validationResult.data
	);

	let result;
	try {
		if (eventId) {
			result = await eventService.updateEventById(eventId, insertModel);
		} else {
			result = await eventService.createEvent(insertModel);
		}
	} catch (error) {
		return { error: (error as Error).message, event: null };
	}

	if (!result) {
		return { error: 'Event could not be created or updated', event: null };
	}

	return {
		error: null,
		event: eventFacadeMapper.mapListModelToDto(result)
	};
};

export const getOwnedEventsList = async (userId: string) => {
	try {
		const events = await eventService.getAllEvents();

		if (!events) {
			return { error: 'Events not found', events: null };
		}

		const owned = events.filter(e => e.organisatorId === userId);

		const venues = await venueService.getAllVenues();
		const venueMap = new Map<string, string>();
		venues.forEach(v => venueMap.set(v.id, v.name));

		const mapped: EventListDto[] = owned.map(e => ({
			...eventFacadeMapper.mapListModelToDto(e),
			venueName: venueMap.get(e.venueId) ?? null
		}));

		return { error: null, events: mapped };
	} catch (error) {
		return { error: (error as Error).message, events: null };
	}
};
