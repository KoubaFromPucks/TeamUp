import type { DrizzleExample } from '@/db/schema/example';

export type ExampleCreateEntity = Omit<DrizzleExample, 'id'>;
