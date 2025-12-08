import z from 'zod';

export const venueUpdateSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	address: z.string().min(1, 'Address is required'),
	gps: z.string().optional().nullable(),
	description: z.string().optional().nullable(),
	pricePerHour: z.number().gte(0),
	ownerId: z.string().min(1, 'Invalid owner ID')
});

export type VenueUpdateDto = z.infer<typeof venueUpdateSchema>;

export type VenueListDto = {
	id: string;
	name: string;
	address: string;
	gps?: string | null;
	description?: string | null;
	pricePerHour: number;
	ownerId: string;
};

export type VenueDetailDto = VenueUpdateDto & {
	id: string;
};
