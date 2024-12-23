import { expect } from '@playwright/test';
import { test } from './fixtures/PomFixtures';
import { es, faker } from '@faker-js/faker';
import { readDataFromExcelFile } from './utils/readDataFromExcelFile';
import { TestDataInterface } from './resources/TestDataInterface';
import * as Misc from './utils/Misc'

test.describe('Feature: Web Test Challenge', () => {

    const RANDOM_NUMBER = faker.number.int({ min: 1, max: 20 });
    const SIGNUP_NAME = faker.person.fullName();
    const SIGNUP_EMAIL = faker.internet.email();
    const GET_URL = 'https://pokeapi.co/api/v2/pokemon';
    const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
    const dataFromExcel: TestDataInterface[] = readDataFromExcelFile('testData.xlsx');

    for(const data of dataFromExcel){
        test(`Test: GET endpoint for information about ${data.name}`, async ({ page, request }) => {
            //const requestFinishedPromise = request.waitForEvent('requestfinished');

            const response = await request.get(`${GET_URL}/${data.name}`);
            const responseObject = await response.json();
            //console.log(requestFinished.timing().requestStart);
            //console.log(requestFinished.timing().responseEnd);
            const abilities = responseObject.abilities.map( (obj) => { return obj.ability.name});
            const abilitiesFromTestData = data.abilities.split(',').map( (ability) => { return ability.trim()});

            expect(responseObject.id, 'id does not match test data').toBe(data.id);
            expect(responseObject.name, 'Name does not match test data').toBe(data.name);
            expect(abilities, 'Abilities do not match test data').toEqual(abilitiesFromTestData);

            const endedAtDateAndTime = "Test Ended at: " + Misc.getDateAndTime();
            console.log(endedAtDateAndTime);
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
            console.log( await response.text());
            const endedAtDateAndTime = "Test Ended at: " + Misc.getDateAndTime();
            console.log(endedAtDateAndTime);
        })
    }
})