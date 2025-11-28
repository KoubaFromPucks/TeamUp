import type { DrizzleTeamInsert, DrizzleTeamSelect } from '@/db/schema/team';

export type TeamCreateEntity = Omit<DrizzleTeamInsert, 'id'>;
export type TeamEntity = DrizzleTeamSelect;
