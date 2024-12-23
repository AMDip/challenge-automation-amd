import { Locator, Page } from '@playwright/test';
import { BasePage } from "../base/BasePage";
import { HomePageChecker } from "./HomePageChecker";
import { Env } from '../../tests/utils/Environment';
import { ResultPage } from '../resultpage/ResultPage';

export class HomePage extends BasePage {
    readonly checker: HomePageChecker;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.checker = new HomePageChecker(this);
    }

    get homePageTittle(): Locator {
        return this.page.getByAltText('The Free Encyclopedia');
    }

    async searchByName(name: string): Promise<ResultPage> {
        await this.page.goto(`${Env.BASE_URL}/wiki/${name}`)
        return new ResultPage(this.page);
    }
}