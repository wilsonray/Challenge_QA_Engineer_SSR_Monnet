import * as XLSX from 'xlsx';
import * as path from 'path';

export interface PokemonTestData {
    id: number;
    name: string;
    abilities: string[];
}

export class ExcelReader {
    private readonly filePath: string;

    constructor(fileName: string) {
        // Asume que el archivo está en una carpeta 'data' en la raíz del proyecto
        this.filePath = path.resolve(__dirname, '../data', fileName);
    }

    //Lee el archivo Excel y devuelve un array de objetos con los datos de prueba
    readPokemonData(): PokemonTestData[] {
        try {
            // Leer el archivo Excel
            const workbook = XLSX.readFile(this.filePath);

            // Obtener la primera hoja
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convertir a JSON (skip header row)
            const rawData: any[] = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,  // Leer como array de arrays
                defval: ''  // Valor por defecto para celdas vacías
            });

            // Remover la fila de encabezado
            const dataRows = rawData.slice(1);

            // Filtrar filas vacías y mapear a objetos
            let pokemonData: PokemonTestData[];
            pokemonData = dataRows
                .filter(row => row[0] && row[1]) // Filtrar filas donde id y name no estén vacíos
                .map(row => ({
                    id: Number(row[0]),
                    name: String(row[1]).trim(),
                    abilities: this.parseAbilities(row[2])
                }));

            return pokemonData;

        } catch (error) {
            console.error('Error al leer el archivo Excel:', error);
            throw new Error(`No se pudo leer el archivo: ${this.filePath}`);
        }
    }

    /**
     * Parsea el string de abilities que puede venir en diferentes formatos
     * Ejemplos: "(overgrow, chlorophyll)" o "overgrow, chlorophyll"
     */
    private parseAbilities(abilitiesString: string): string[] {
        if (!abilitiesString) return [];

        // Remover paréntesis si existen
        const cleanString = abilitiesString
            .replace(/[()]/g, '')
            .trim();

        // Dividir por coma y limpiar espacios
        return cleanString
            .split(',')
            .map(ability => ability.trim())
            .filter(ability => ability.length > 0);
    }

}

// Exportar funcion
export function getPokemonTestData(fileName: string): PokemonTestData[] {
    const reader = new ExcelReader(fileName);
    return reader.readPokemonData();
}