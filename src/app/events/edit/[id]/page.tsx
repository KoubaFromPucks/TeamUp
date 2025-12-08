import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getEventById } from '@/facades/event/event-facade';
import { EventForm } from '@/modules/event/components/update-event-form/update-event-form';
import { venueService } from '@/services/venue/service';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id ?? null;

  const { error, event } = await getEventById(id);

  if (error || !event) {
    throw new Error('event not found');
  }

  if (!userId || userId !== event.organisatorId) {
    throw new Error('not allowed');
  }

  const venues = await venueService.getAllVenues();

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Edit Event</h1>
      <EventForm
        event={event}
        navPath={`/events/${id}`}
        organisatorId={userId}
        venues={venues.map(v => ({ id: v.id, name: v.name }))}
      />
    </div>
  );
}
