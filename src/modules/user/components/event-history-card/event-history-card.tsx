'use client';

import React from "react";
import { UserEventHistoryDataDto } from "@/facades/user/schema";
import { Card, CardContent, CardFooter, CardLabeledItem } from "@/components/card";
import { InvitationStateItem } from "@/modules/EventInvitation/components/event-invitation-list-card";

export const EventHistoryCard = ({ userData } : { userData: UserEventHistoryDataDto }) => {
    return (
        <Card className="my-2">
            <CardContent>
                <h2 className="text-2xl font-extrabold text-gray-900 leading-tight w-1/3">
                    {userData.event.name}
                </h2>
                <CardLabeledItem label="Start - End">
                    <p className="text-base text-gray-700 font-medium">
                        {userData.concreteEvent.startDate} - {userData.concreteEvent.endDate}
                    </p>
                </CardLabeledItem>
                
                <CardFooter>
                    <InvitationStateItem state={userData.eventInvitation.state || 'Pending'} />
                </CardFooter>
            </CardContent>
        </Card>
    );
}