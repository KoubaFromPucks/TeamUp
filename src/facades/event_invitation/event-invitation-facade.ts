import { eventInvitationService } from "@/services/event_invitation/event-invitation-service";
import { eventInvitationMapper } from "./mapper";
import { EventInvitationUpdateDto, eventInvitationUpdateSchema } from "./schema";


export const  createUpdateEventInvitation = async(eventInvitationId: string | undefined, eventInvitation: EventInvitationUpdateDto) => {
    const validationResult = eventInvitationUpdateSchema.safeParse(eventInvitation);

    if(!validationResult.success){
        const errors = validationResult.error.flatten().fieldErrors;
        return {error: errors, eventInvitation: null};
    }

    const insertEventInvitationModel = eventInvitationMapper.mapDtoToEventInvitationInsertModel(validationResult.data);
    let result;
    try{
        if(eventInvitationId){
            result = await eventInvitationService.updateEventInvitation(eventInvitationId, insertEventInvitationModel);
        }else{
            result = await eventInvitationService.createEventInvitation(insertEventInvitationModel);
        }
    }
    catch (error){
        return {error: (error as Error).message, eventInvitation: null};
    }

    return { error: null, eventInvitation: eventInvitationMapper.mapEventInvitationListModelToDto(result)};
}

export const getEventInvitationById = async(eventInvitationId: string) => {
    try{
        const result = await eventInvitationService.getEventInvitationById(eventInvitationId);
        if(!result){
            return { error: 'Event invitation not found', eventInvitation: null };
        }
        return { error: null, eventInvitation: eventInvitationMapper.mapEventInvitationDetailModelToDTO(result)};
    } catch (error){
        return { error: (error as Error).message, eventInvitation: null};
    }
}

export const getEventInvitationByConcreteEventId = async(concreteEventId: string) => {
    try{
        const result = await eventInvitationService.getEventInvitationsByConcreteEventId(concreteEventId);
        if(!result){
            return { error: 'Event invitations not found', eventInvitation: null };
        }
        return { error: null, eventInvitations: result.map(eventInvitationMapper.mapEventInvitationListModelToDto)};
    } catch (error){
        return { error: (error as Error).message, eventInvitation: null};
    }
}

export const getEventInvitationByUserId = async(userId: string) => {
    try{
        const result = await eventInvitationService.getEventInvitationsByUserId(userId);
        if(!result){
            return { error: 'Event invitation not found', eventInvitation: null };
        }
        return { error: null, eventInvitation: result.map(eventInvitationMapper.mapEventInvitationListModelToDto)};
    } catch (error){
        return { error: (error as Error).message, eventInvitation: null};
    }
}

export const getAllEventInvitation = async() => {
    try{
        const result = await eventInvitationService.getAllEventInvitations();
        if(!result){
            return { error: 'Event invitation not found', eventInvitation: null };
        }
        return { error: null, eventInvitation: result.map(eventInvitationMapper.mapEventInvitationListModelToDto)};
    } catch (error){
        return { error: (error as Error).message, eventInvitation: null};
    }
}

export const deleteEventInvitation = async(eventInvitationId: string) => {
    try{
        const result = await eventInvitationService.deleteEventInvitation(eventInvitationId);
        if(!result){
            return {error: 'Event invitation could not be deleted', ok: false}
        }
        return {error: null, ok: true};
    } catch(error) { 
        return { error: (error as Error).message, ok: false}
    }
}