import { ConcreteEventDetailModel, ConcreteEventInsertModel, ConcreteEventListModel } from "@/services/concrete_event/schema";
import { ConcreteEventDetailDto, ConcreteEventListDto, ConcreteEventUpdateDto } from "./schema";
import { eventInvitationMapper } from "../event_invitation/mapper";

export const ConcreteEventMapper = {
    mapConcreteEventDetailModelToDto(model: ConcreteEventDetailModel): ConcreteEventDetailDto{
        return {
            id: model.id,
            startDate: model.startDate,
            endDate: model.endDate,
            price: model.price,
            eventId: model.eventId,
            invitedUsers: model.invitedUsers.map(eventInvitationMapper.mapEventInvitationListModelToDto)
        }
    },

    mapConcreteEventListModelToDto(model: ConcreteEventListModel): ConcreteEventListDto{
        return {
            id: model.id,
            endDate: model.endDate,
            startDate: model.startDate,
            eventId: model.eventId,
            price: model.price
        }
    },

    mapDtoToConcreteEventInsertModel(dto: ConcreteEventUpdateDto): ConcreteEventInsertModel{
        return {
            endDate: dto.endDate,
            startDate: dto.startDate,
            eventId: dto.eventId,
            price: dto.price
        }
    }
}