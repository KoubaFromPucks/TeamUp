import { getConcreteEventById } from "@/facades/concrete_event/concrete-event-facade";
import { ConcreteEventForm } from "@/modules/concreteEvent/components/update-concrete-event-form/update-concrete-event-form";
import React from 'react';

export const Page = async ({
	params
}: {
	params: { id: string };
}) => {
    const { id } = await params;
	const { error, concreteEvent } = await getConcreteEventById(id);

    if(error || !concreteEvent){
        throw new Error("concrete event not found");
    }

	return (
		<div>
			<h1 className="text-lg font-semibold">Edit Concrete Event</h1>

			<ConcreteEventForm
				concreteEvent={concreteEvent}
				navPath="/"
			/>
		</div>
	);
};

export default Page;