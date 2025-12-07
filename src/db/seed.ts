import 'dotenv/config';
import { db } from './client';
import { user } from './schema/better-auth';
import { teamTable } from './schema/team';
import { teamMemberTable } from './schema/team-member';
import { venueTable } from './schema/venue';
import { eventTable } from './schema/event';
import { concreteEventTable } from './schema/concrete-event';
import { eventInvitationTable } from './schema/event-invitation';
import { boardItemTable } from './schema/board-item';

async function seed() {
	console.log('Seeding database...\n');

	try {
		// 1. Create users
		console.log('Creating users...');
		const users = await db
			.insert(user)
			.values([
				{
					id: crypto.randomUUID(),
					name: 'John Doe',
					email: 'john@example.com',
					nickname: 'johnd',
					emailVerified: true,
					phoneNumber: '+420123456789',
					image: 'https://avatar.vercel.sh/john'
				},
				{
					id: crypto.randomUUID(),
					name: 'Jane Smith',
					email: 'jane@example.com',
					nickname: 'janes',
					emailVerified: true,
					phoneNumber: '+420987654321',
					image: 'https://avatar.vercel.sh/jane'
				},
				{
					id: crypto.randomUUID(),
					name: 'Bob Wilson',
					email: 'bob@example.com',
					nickname: 'bobw',
					emailVerified: true,
					phoneNumber: '+420555666777',
					image: 'https://avatar.vercel.sh/bob'
				}
			])
			.returning();
		console.log(`Created ${users.length} users\n`);

		// 2. Create teams
		console.log('Creating teams...');
		const teams = await db
			.insert(teamTable)
			.values([
				{
					id: crypto.randomUUID(),
					name: 'Basketball Squad',
					desc: 'Weekly basketball games',
					organizerId: users[0].id,
					imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc'
				},
				{
					id: crypto.randomUUID(),
					name: 'Football Team',
					desc: 'Sunday football matches',
					organizerId: users[1].id,
					imageUrl:
						'https://images.unsplash.com/photo-1579952363873-27f3bade9f55'
				}
			])
			.returning();
		console.log(`Created ${teams.length} teams\n`);

		// 3. Add team members
		console.log('Adding team members...');
		await db.insert(teamMemberTable).values([
			{ userId: users[0].id, teamId: teams[0].id },
			{ userId: users[1].id, teamId: teams[0].id },
			{ userId: users[2].id, teamId: teams[0].id },
			{ userId: users[1].id, teamId: teams[1].id },
			{ userId: users[2].id, teamId: teams[1].id }
		]);
		console.log('Added team members\n');

		// 4. Create venues
		console.log('Creating venues...');
		const venues = await db
			.insert(venueTable)
			.values([
				{
					id: crypto.randomUUID(),
					name: 'City Sports Center',
					address: 'Main Street 123, Prague',
					gps: '50.0755,14.4378',
					description: 'Modern indoor sports facility',
					pricePerHour: 500
				},
				{
					id: crypto.randomUUID(),
					name: 'Park Arena',
					address: 'Park Avenue 45, Prague',
					gps: '50.0875,14.4215',
					description: 'Outdoor sports field',
					pricePerHour: 300
				}
			])
			.returning();
		console.log(`Created ${venues.length} venues\n`);

		// 5. Create events
		console.log('Creating events...');
		const events = await db
			.insert(eventTable)
			.values([
				{
					id: crypto.randomUUID(),
					venueId: venues[0].id,
					organisatorId: users[0].id,
					name: 'Weekly Basketball',
					startTime: '18:00',
					endTime: '20:00',
					dayOfWeek: 'Wed',
					inviteType: 'private',
					pricingType: 'pay_as_you_go',
					totalPrice: 500
				},
				{
					id: crypto.randomUUID(),
					venueId: venues[1].id,
					organisatorId: users[1].id,
					name: 'Sunday Football',
					startTime: '14:00',
					endTime: '16:00',
					dayOfWeek: 'Sun',
					inviteType: 'public',
					pricingType: 'pre_paid',
					totalPrice: 300
				}
			])
			.returning();
		console.log(`Created ${events.length} events\n`);

		// 6. Create concrete events
		console.log('Creating concrete events...');
		const concreteEvents = await db
			.insert(concreteEventTable)
			.values([
				{
					id: crypto.randomUUID(),
					eventId: events[0].id,
					price: 500,
					startDate: '2025-12-11T18:00:00Z',
					endDate: '2025-12-11T20:00:00Z'
				},
				{
					id: crypto.randomUUID(),
					eventId: events[0].id,
					price: 500,
					startDate: '2025-12-18T18:00:00Z',
					endDate: '2025-12-18T20:00:00Z'
				},
				{
					id: crypto.randomUUID(),
					eventId: events[1].id,
					price: 300,
					startDate: '2025-12-08T14:00:00Z',
					endDate: '2025-12-08T16:00:00Z'
				}
			])
			.returning();
		console.log(`Created ${concreteEvents.length} concrete events\n`);

		// 7. Create event invitations
		console.log('Creating event invitations...');
		await db.insert(eventInvitationTable).values([
			{
				id: crypto.randomUUID(),
				concreteEventId: concreteEvents[0].id,
				userId: users[0].id,
				state: 'Accepted'
			},
			{
				id: crypto.randomUUID(),
				concreteEventId: concreteEvents[0].id,
				userId: users[1].id,
				state: 'Accepted'
			},
			{
				id: crypto.randomUUID(),
				concreteEventId: concreteEvents[0].id,
				userId: users[2].id,
				state: 'Pending'
			},
			{
				id: crypto.randomUUID(),
				concreteEventId: concreteEvents[1].id,
				userId: users[0].id,
				state: 'Accepted'
			},
			{
				id: crypto.randomUUID(),
				concreteEventId: concreteEvents[2].id,
				userId: users[1].id,
				state: 'Accepted'
			},
			{
				id: crypto.randomUUID(),
				concreteEventId: concreteEvents[2].id,
				userId: users[2].id,
				state: 'Declined'
			}
		]);
		console.log('Created event invitations\n');

		// 8. Create board items
		console.log('Creating board items...');
		await db.insert(boardItemTable).values([
			{
				id: crypto.randomUUID(),
				concreteEventId: concreteEvents[0].id,
				authorId: users[0].id,
				title: 'Important: Bring your own ball',
				content:
					"Please remember to bring your basketball. The venue doesn't provide equipment.",
				isPinned: true,
				createdAt: new Date().toISOString(),
				updatedAt: null
			},
			{
				id: crypto.randomUUID(),
				concreteEventId: concreteEvents[0].id,
				authorId: users[0].id,
				title: 'Parking information',
				content:
					'Free parking available in the back of the building. Enter through the side gate.',
				isPinned: false,
				createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
				updatedAt: null
			},
			{
				id: crypto.randomUUID(),
				concreteEventId: concreteEvents[2].id,
				authorId: users[1].id,
				title: 'Weather update',
				content: 'Weather forecast looks good for Sunday. Game is confirmed!',
				isPinned: true,
				createdAt: new Date().toISOString(),
				updatedAt: null
			}
		]);
		console.log('Created board items\n');

		console.log('Database seeded successfully!');
	} catch (error) {
		console.error('Error seeding database:', error);
		throw error;
	}
}

seed()
	.then(() => process.exit(0))
	.catch(() => process.exit(1));
