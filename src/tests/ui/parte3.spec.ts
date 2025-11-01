import { test, expect } from '../../helpers/fixtures';
import { getPokemonTestData, PokemonTestData } from '../../helpers/readExcelPokemon';
import { PokemonPage } from "../../pom/ui/pokemon.page";
import { validateImageFile } from "../../helpers/imageValidation";

// Leer datos del Excel
const testData = getPokemonTestData('Challenge automation - Datos-pruebas 2.xlsx');

test.describe('Prueba Web: Pokemon - Wikipedia', () => {
    // Test parametrizado por cada fila del Excel
    testData.forEach((pokemon: PokemonTestData) => {
        test(`Pokemon ID: ${pokemon.id} - ${pokemon.name}`, async ({ page, encryptedKey: _ }) => {
            const newPokemon = new PokemonPage(page)
            // Ir a la página web (wikipedia)
            await newPokemon.navigateToPokemonWikipedia(pokemon.name)
            await newPokemon.getArtistName()
            // await newPokemon.downloadImage(pokemon.name)

            // Descargar imagen - se retorna el path de la imagen
            const imagePath = await newPokemon.downloadImage(pokemon.name);

            // Validar la imagen descargada
            const validation = validateImageFile(imagePath);
            expect(validation.isValidExtension).toBeTruthy();
            expect(validation.isValidSize).toBeTruthy();

            console.log(`Image validation passed: ${validation.extension}, ${validation.size} bytes`);

            // Loguear fecha y hora de finalización
            console.log(`Test finalizado: ${new Date().toISOString()}`);
        });

    });
});
