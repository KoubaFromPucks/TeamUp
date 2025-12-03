import { EventInvitationListModel } from "../event_invitation/schema";

export type ConcreteEventDetailModel = {
    id: string;
    eventId: string;
    price: number | null;
    startDate: string;
    endDate: string;
    invitedUsers: EventInvitationListModel[]
}

export type ConcreteEventListModel = Omit<ConcreteEventDetailModel, 'invitedUsers'>;

export type ConcreteEventInsertModel = Omit<ConcreteEventDetailModel, 'id' | 'invitedUsers'>;