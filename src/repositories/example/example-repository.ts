import type { ExampleCreateEntity } from './schema';

export const exampleRepository = {
	async createExample(exampleEntity: ExampleCreateEntity) {
		console.log(
			"There should be called functions like: 'await db.user.create()'",
			exampleEntity
		);
		return null; // should return created object
	}
};
