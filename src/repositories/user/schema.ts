import type { DrizzleUserInsert, DrizzleUserSelect } from '@/db/schema/user';

export type UserCreateEntity = Omit<DrizzleUserInsert, 'id'>;
export type UserEntity = DrizzleUserSelect;
