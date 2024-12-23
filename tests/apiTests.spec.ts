import { expect } from '@playwright/test';
import { test } from './fixtures/PomFixtures';
import { es, faker } from '@faker-js/faker';
import { readDataFromExcelFile } from './utils/readDataFromExcelFile';
import { TestDataInterface } from './resources/TestDataInterface';
import * as Misc from './utils/Misc'

test.describe('Feature: API Test Challenge', () => {

    const GET_URL = 'https://pokeapi.co/api/v2/pokemon';
    const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
    const MAX_EXECUTION_TIME = 10 * 1000
    const dataFromExcel: TestDataInterface[] = readDataFromExcelFile('testData.xlsx');

    for(const data of dataFromExcel){
        test(`Test: GET endpoint for information about ${data.name}`, async ({ request }) => {
            const sendTime = (new Date()).getTime()
            const response = await request.get(`${GET_URL}/${data.name}`);
            const receivedTime = (new Date()).getTime();
            const requestTimeMs = receivedTime - sendTime;
            const responseObject = await response.json();
            const abilities = responseObject.abilities.map( (obj) => { return obj.ability.name});
            const abilitiesFromTestData = data.abilities.split(',').map( (ability) => { return ability.trim()});

            expect(responseObject.id, 'id does not match test data').toBe(data.id);
            expect(responseObject.name, 'Name does not match test data').toBe(data.name);
            expect(abilities, 'Abilities do not match test data').toEqual(abilitiesFromTestData);
            expect(requestTimeMs).toBeLessThan(MAX_EXECUTION_TIME);

            console.log(Misc.getEndTestDateAndTime());
        })

        test(`Test: POST Endpoint to create ${data.name}`, async ({ request }) => {
            const response = await request.post(POST_URL, {
                data: {
                    id: data.id,
                    name: data.name,
                    abilities: data.abilities
                }
            })
            expect(response.status()).toBe(201);
            console.log(Misc.getEndTestDateAndTime());
        })
    }
})