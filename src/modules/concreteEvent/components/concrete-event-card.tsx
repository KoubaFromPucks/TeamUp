import { Card, CardLabeledItem } from "@/components/card";
import { CardContent, CardHeader } from "@/components/card/card";
import { ConcreteEventListDto } from "@/facades/concrete_event/schema";
import Link from "next/link";
import { CalendarDays, DollarSign } from "lucide-react";
import { DeleteConcreteEventButton } from "./delete-concrete-event-button";
import React from 'react';

export const ConcreteEventCard = ({
	concreteEvent,
    isDetail
}: {
	concreteEvent: ConcreteEventListDto,
    isDetail: boolean
}) => {
	return (
		<div className="transition-transform hover:-translate-y-1">
			<Card>
				<CardHeader className="flex items-center justify-between text-left">
					<h3 className="text-lg font-semibold">
						{concreteEvent.eventName}
					</h3>

                    <div className="flex gap-3">
						{
							isDetail &&
							<DeleteConcreteEventButton id={concreteEvent.id} />
						}

						<Link
							href={isDetail? `/concreteEvent/edit/${concreteEvent.id}` :`/concreteEvent/${concreteEvent.id}`}
							className="flex items-center rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
						>
							{isDetail? 'Edit': 'Detail'}
						</Link>
                    </div>
				</CardHeader>

				<CardContent className="gap-6">
					<CardLabeledItem label="Date">
						<div className="flex items-center justify-center gap-2 text-gray-700">
							<CalendarDays size={18} />
							<span>
								{concreteEvent.startDate} – {concreteEvent.endDate}
							</span>
						</div>
					</CardLabeledItem>

					<CardLabeledItem label="Price">
						<div className="flex items-center justify-center gap-2 text-gray-700">
							<DollarSign size={18} />
                            <span className="font-semibold">
								{concreteEvent.price}
							</span>
						</div>
					</CardLabeledItem>
				</CardContent>
			</Card>
		</div>
	);
};
