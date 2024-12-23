import { expect } from '@playwright/test';
import { test } from './fixtures/PomFixtures';
import { es, faker } from '@faker-js/faker';
import { readDataFromExcelFile } from './utils/readDataFromExcelFile';
import { TestDataInterface } from './resources/TestDataInterface';

test.describe('Feature: Web Test Challenge', () => {

    const RANDOM_NUMBER = faker.number.int({ min: 1, max: 20 });
    const SIGNUP_NAME = faker.person.fullName();
    const SIGNUP_EMAIL = faker.internet.email();
    const GET_URL = 'https://pokeapi.co/api/v2/pokemon';
    const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
    const dataFromExcel: TestDataInterface[] = readDataFromExcelFile('testData.xlsx');

    for(const data of dataFromExcel){
        test(`Test: GET endpoint for information about ${data.name}`, async ({ request }) => {
            const response = await request.get(`${GET_URL}/${data.name}`);
            const responseObject = await response.json();
            const abilities = responseObject.abilities.map( (obj) => { return obj.ability.name});
            const abilitiesFromTestData = data.abilities.split(',').map( (ability) => { return ability.trim()});

            expect(responseObject.id, 'id does not match test data').toBe(data.id);
            expect(responseObject.name, 'Name does not match test data').toBe(data.name);
            expect(abilities, 'Abilities do not match test data').toEqual(abilitiesFromTestData);
            const currentdate = new Date(); 
            const endedAtDateAndTime = "Test Ended at: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            console.log(endedAtDateAndTime);
        })
    }
})