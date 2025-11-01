import { test, expect } from '../../helpers/fixtures';
import { BaseApi } from '../../pom/api/baseApi';
import { getPokemonTestData, PokemonTestData } from '../../helpers/readExcelPokemon';
import { parseAbilities } from "../../helpers/pokeapi_helpers";

// Leer datos del Excel
const testData = getPokemonTestData('Challenge automation - Datos-pruebas 2.xlsx');

test.describe('Pokemon API Tests - Parte 1', () => {
    let pokeApi: BaseApi;

    test.beforeEach(async ({ request }) => {
        pokeApi = new BaseApi('pokeapi', request);
    });

    // Test parametrizado por cada fila del Excel
    testData.forEach((pokemon: PokemonTestData) => {
        test(`GET Pokemon ID: ${pokemon.id} - ${pokemon.name}`, async ({ encryptedKey: _ }) => {
            const startTime = Date.now();

            // Se envía el request GET con el id del pokemon
            const response = await pokeApi.get(`pokemon/${pokemon.id}`);
            const responseTime = Date.now() - startTime;

            const responseBodyPokemon = await response.json();
            const arrangedAbilities = parseAbilities(responseBodyPokemon.abilities);

            // Assertions requeridos
            expect(responseBodyPokemon.id).toBe(pokemon.id);
            expect(responseBodyPokemon.name).toBe(pokemon.name);
            expect(arrangedAbilities).toStrictEqual(pokemon.abilities);
            expect(responseTime).toBeLessThan(10000);

            // Loguear fecha y hora de finalización
            console.log(`Test finalizado: ${new Date().toISOString()}`);
        });

        test(`GET Pokemon Name: ${pokemon.name}`, async ({ encryptedKey: _ }) => {
            const startTime = Date.now();

            // Se envía el request GET con el nombre del pokemon
            const response = await pokeApi.get(`pokemon/${pokemon.name}`);
            const responseTime = Date.now() - startTime;

            const responseBodyPokemon = await response.json();
            const arrangedAbilities = parseAbilities(responseBodyPokemon.abilities);

            // Assertions requeridos
            expect(responseBodyPokemon.id).toBe(pokemon.id);
            expect(responseBodyPokemon.name).toBe(pokemon.name);
            expect(arrangedAbilities).toStrictEqual(pokemon.abilities);
            expect(responseTime).toBeLessThan(10000);

            // Loguear fecha y hora de finalización
            console.log(`Test finalizado: ${new Date().toISOString()}`);
        });
    });
});
