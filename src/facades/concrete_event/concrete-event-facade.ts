'use server'
import { concreteEventService } from '@/services/concrete_event/concrete-event-service';
import { ConcreteEventMapper } from './mapper';
import { ConcreteEventUpdateDto, concreteEventUpdateSchema } from './schema';

export const createUpdateConcreteEvent = async (
	concreteEventId: string | undefined,
	concreteEvent: ConcreteEventUpdateDto
) => {
	const validationResult = concreteEventUpdateSchema.safeParse(concreteEvent);

	if (!validationResult.success) {
		const errors = validationResult.error.flatten().fieldErrors;
		return { error: errors, concreteEvent: null };
	}

	const insertConcreteEventModel =
		ConcreteEventMapper.mapDtoToConcreteEventInsertModel(validationResult.data);
	let result;
	try {
		if (concreteEventId) {
			result = await concreteEventService.updateConcreteEventById(
				concreteEventId,
				insertConcreteEventModel
			);
		} else {
			result = await concreteEventService.createConcreteEvent(
				insertConcreteEventModel
			);
		}
	} catch (error) {
		return { error: (error as Error).message, concreteEvent: null };
	}
	return {
		error: null,
		concreteEvent: ConcreteEventMapper.mapConcreteEventListModelToDto(result)
	};
};

export const getConcreteEventById = async (concreteEventId: string) => {
	try {
		const result =
			await concreteEventService.getConcreteEnventById(concreteEventId);
		if (!result) {
			return { error: 'Concrete event not found', concreteEvent: null };
		}
		return {
			error: null,
			concreteEvent:
				ConcreteEventMapper.mapConcreteEventDetailModelToDto(result)
		};
	} catch (error) {
		return { error: (error as Error).message, concreteEvent: null };
	}
};

export const getConcreteEventsByEventId = async (eventId: string) => {
	try {
		const result =
			await concreteEventService.getConcreteEventsByEventId(eventId);
		if (!result) {
			return { error: 'Concrete event not found', concreteEvent: null };
		}
		return {
			error: null,
			concreteEvent: result.map(
				ConcreteEventMapper.mapConcreteEventListModelToDto
			)
		};
	} catch (error) {
		return { error: (error as Error).message, concreteEvent: null };
	}
};

export const getAllConcreteEvents = async () => {
	try {
		const result = await concreteEventService.getAllConcreteEvents();
		if (!result) {
			return { error: 'Concrete event not found', concreteEvent: null };
		}
		return {
			error: null,
			concreteEvent: result.map(
				ConcreteEventMapper.mapConcreteEventListModelToDto
			)
		};
	} catch (error) {
		return { error: (error as Error).message, concreteEvent: null };
	}
};

export const deleteConcreteEvent = async (concreteEventId: string) => {
	try {
		const result =
			await concreteEventService.deleteConcreteEvent(concreteEventId);
		if (!result) {
			return { error: 'Concrete event could not be deleted', ok: false };
		}
		return { error: null, ok: true };
	} catch (error) {
		return { error: (error as Error).message, ok: false };
	}
};

export const getAllConcreteEventsFromCurrentDate = async () => {
	try {
		const result = await concreteEventService.getAllConcreteEventsFromCurrentDate();
		if (!result) {
			return { error: 'Concrete event not found', concreteEvent: null };
		}
		return {
			error: null,
			concreteEvent: result.map(
				ConcreteEventMapper.mapConcreteEventListModelToDto
			)
		};
	} catch (error) {
		return { error: (error as Error).message, concreteEvent: null };
	}
};
