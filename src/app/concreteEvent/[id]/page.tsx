import { getConcreteEventById } from "@/facades/concrete_event/concrete-event-facade";
import { ConcreteEventCard } from "@/modules/concreteEvent/components/concrete-event-card";
import { EventInvitationListCard } from "@/modules/EventInvitation/components/event-invitation-list-card";
import Link from "next/link";
import React from 'react';

type PageProps = {
    params: Promise<{id: string}>;
}

const Page = async({params}: PageProps) => {
    const { id } = await params;
    const {error, concreteEvent} = await getConcreteEventById(id);

    if(!concreteEvent || error){
		throw new Error('error fetching concrete events');
	}

    console.log(concreteEvent);

    return(
        <div>
            <ConcreteEventCard concreteEvent={concreteEvent} isDetail={true}></ConcreteEventCard>
            <div className="flex mb-2 mt-2 justify-between">
                <h1 className="text-lg font-semibold">ivited users</h1>
                <Link href={'/invite/create'} className="rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300">invite users</Link>
            </div>
            
            <div className='flex flex-wrap gap-6'>
                {concreteEvent.invitedUsers.map(c =>(
                    <EventInvitationListCard eventInvitation={c} key={c.id}/>
                ))}
            </div>
            
        </div>
    );
}

export default Page;