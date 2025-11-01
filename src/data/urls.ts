import * as dotenv from 'dotenv';

dotenv.config();

class Urls {
    private readonly env: string;
    constructor() {
        this.env = process.env.ENVIRONMENT ? process.env.ENVIRONMENT.toLowerCase() : "qa"; //POR DEFECTO HAY QUE COLOCAR ALGUN VALOR
    }

    getPokeapiUrl() {
        let pokeapiUrl = {
            qa  : 'https://pokeapi.co/api/v2/',
            cert: 'https://pokeapi.co/api/v2/' //Idealmente aquí estaría la URL del ambiente cert (o PROD)
        };
        return pokeapiUrl[this.env];
    }

    getJsonplaceholderUrl() {
        let jsonplaceholderUrl = {
            qa  : 'https://jsonplaceholder.typicode.com/',
            cert: 'https://jsonplaceholder.typicode.com/' //Idealmente aquí estaría la URL del ambiente cert (o PROD)
        };
        return jsonplaceholderUrl[this.env];
    }

    getAllUrls() {
        let pokeapiUrl = this.getPokeapiUrl();
        let jsonplaceholderUrl = this.getJsonplaceholderUrl();
        return {
            "pokeapi"    : pokeapiUrl,
            "pokemon"   : `${pokeapiUrl}/pokemon`,
            "jsonplaceholder": jsonplaceholderUrl,

        }
    }

}

export default () => new Urls();