import {expect, test} from "../../helpers/fixtures";
import {BaseApi} from "../../pom/api/baseApi";

test.describe('JSONPlaceholder API Tests - Parte 2', () => {
    let jsonPlaceholderApi: BaseApi;

    test.beforeEach(async ({ request }) => {
        jsonPlaceholderApi = new BaseApi('jsonplaceholder', request);
    });

    test('POST create new post', async ({ encryptedKey: _ }) => {
        const postData = {
            title: 'Test Post',
            body: 'This is a test post from automated testing',
            userId: 1
        };

        const response = await jsonPlaceholderApi.post('posts', postData);
        const responseBody = await response.json();

        // Assertions
        expect(response.status()).toBe(201);
        expect(responseBody.title).toBe(postData.title);
        expect(responseBody.body).toBe(postData.body);
        expect(responseBody.userId).toBe(postData.userId);
        expect(responseBody.id).toBeDefined();

        // Loguear fecha y hora de finalización
        console.log(`Test finalizado: ${new Date().toISOString()}`);
    });
});