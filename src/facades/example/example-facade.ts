'use server';

import { exampleService} from "@/services/example/example-service";
import { type Example, ExampleCreateSchema } from "./schema";

export const createExample = async (formData: FormData): Example => {
    const data = Object.fromEntries(formData.entries());

    const validationResult = ExampleCreateSchema.safeParse(data);
    if (!validationResult.success) {
        const errors = validationResult.error.flatten().fieldErrors;
        throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    }

    const result = await exampleService.createExample(validationResult.data);

    // Check results and handle errors

    return result;
}