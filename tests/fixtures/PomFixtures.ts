import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/homepage/HomePage';
import { Env } from '../../tests/utils/Environment';
import CryptoJS from 'crypto-js';

type pages = {
    homePage: HomePage;
}

function getSecretKey(): string {
    const secretKey = CryptoJS.SHA256(Env.SECRET_KEY).toString(CryptoJS.enc.Hex);
    return 'Secret Key Encrypted: ' + secretKey;
} 

export const test = base.extend<pages>({
    homePage: async ({ page }, use) => {
        let homePage: HomePage;
        await page.goto(Env.BASE_URL);
        homePage = new HomePage(page);
        await homePage.checker.homePageTitleImageIsVisible();
        console.log(getSecretKey());
        await use(homePage);
    },
    request: async ({ request }, use) => {
        console.log(getSecretKey());
        await use(request);
    }
});