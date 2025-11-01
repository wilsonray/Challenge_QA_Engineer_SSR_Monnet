import { Page, expect} from "@playwright/test";
import * as fs from 'fs';
import * as path from 'path';

export class PokemonPage{

    constructor(private page: Page) {}

    async navigateToPokemonWikipedia(pokemonName: string) {
        await this.page.goto(`https://en.wikipedia.org/wiki/${pokemonName}`);
        await expect(this.page).toHaveTitle(new RegExp(pokemonName, 'i'));
    }

    async getArtistName(){
        const caption = this.page.locator('.infobox-caption');

        const fullText = await caption.innerText();
        const artistName = await caption.locator('a').innerText();

        const artworkText = fullText.replace(artistName, '').trim();
        console.log(artworkText + " " + artistName); // #Pikachu artwork by Ken Sugimori
    }

    async downloadImage(imageName: string) {

        await this.page.locator('[class="infobox-image"]').click();
        await this.page.waitForURL(/File:/);

        const fullImageLink = this.page.locator('[crossorigin="anonymous"]')
        await fullImageLink.click({ button: 'right' });

        const downloadButton = this.page.locator('a[download]');
        await downloadButton.click();
        const href = await downloadButton.getAttribute('href');

        if (!href) throw new Error('Full image link not found');

        const imageUrl = href.startsWith('http') ? href : `https:${href}`;

        console.log('Full-res image URL:', imageUrl);

        const response = await this.page.request.get(imageUrl);
        const buffer = await response.body();

        // Ubicación de la carpeta
        const dir = path.join(process.cwd(), 'images');

        // Crea la carpeta si no existe
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        // Ubicación del archivo a descargar
        const filePath = path.join(dir, imageName + ".png");

        fs.writeFileSync(filePath, buffer);

        console.log(`Image saved at: ${filePath}`);

        return filePath
    }

}