import { test } from './fixtures/PomFixtures';
import { readDataFromExcelFile } from './utils/readDataFromExcelFile';
import { TestDataInterface } from './resources/TestDataInterface';
import { ResultPage } from '../pages/resultpage/ResultPage';

test.describe('Feature: Web Test Challenge', () => {

    const dataFromExcel: TestDataInterface[] = readDataFromExcelFile('testData.xlsx');

    for(const data of dataFromExcel){
        test(`Test: Search in wikipedia information about ${data.name}`, async ({ homePage }) => {
            const resultPage: ResultPage = await homePage.searchByName(data.name);
            await resultPage.checker.resultPageTitleIsVisible();
            await resultPage.checker.titleNameIsVisible(data.name);
            console.log('Artwork By: ' + await resultPage.getArtworkByText())
            const savedImagePath = await resultPage.downloadImage(data.name);
            await resultPage.checker.checkFileSizeByName(savedImagePath);
        })
    }
})