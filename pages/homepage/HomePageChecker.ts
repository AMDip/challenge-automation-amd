import { expect } from '@playwright/test';
import { BasePageChecker } from "../base/BasePageChecker";
import { HomePage } from './HomePage';

export class HomePageChecker extends BasePageChecker {
    readonly page: HomePage;

    constructor(page: HomePage) {
        super(page);
        this.page = page;
    }

    async homePageTitleImageIsVisible() {
        await expect(this.page.homePageTittle).toBeVisible();
    }
}