import type { ExampleCreateDto } from "./schema";
import { exampleRepository } from "@/repositories/example/example-repository";

export const exampleService = {
    async createExample(exampleEntity: ExampleCreateDto) {
        // Kontrola vstupních dat - validuje se: 
        //      obcohdní logika - např. nesnaží se uživatel přihlásit na soukromou akci na kterou nemá pozvánku
        //      integrita databáze - např. jestli už není uživatel s daným emailem zaregistrován
        // Syntaxe a formát dat by měly být kontrolovány na fasádách
        
        await exampleRepository.createExample(exampleEntity);

        console.log("There should be called functions like: 'await db.user.create()'");
    }
};