export type ExampleDto = {
	id: number;
	name: string;
};

export type ExampleCreateDto = Omit<ExampleDto, 'id'>;
