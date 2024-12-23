import { Locator, Page } from '@playwright/test';
import { BasePage } from "../base/BasePage";
import { ResultPageChecker } from "./ResultPageChecker";
import { Env } from '../../tests/utils/Environment';

export class ResultPage extends BasePage {
    readonly checker: ResultPageChecker;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.checker = new ResultPageChecker(this);
    }

    get ResultPageTitle(): Locator {
        return this.page.locator('#firstHeading');
    }
    get artworkBy(): Locator {
        return this.page.locator('.infobox-caption').locator('a');
    }
    get imageFromPage(): Locator {
        return this.page.locator('.infobox-image').locator('img');
    }
    get imageFromPage2(): Locator {
        return this.page.locator('.infobox-image').locator('span').getByRole('link');
    }

    async searchByName(name: string) {
        await this.page.goto(`${Env.BASE_URL}/wiki/${name}`)
    }

    async getArtworkByText(): Promise<string | null>{
        const artist = await this.artworkBy.textContent();
        return artist;
    }

    async downloadImage(imageName: string) {
        const imageSrcString = await this.imageFromPage.getAttribute('src');
        const extension = imageSrcString.split('.').pop();
        const filePath = './images/' + imageName + '.' + extension
        await this.imageFromPage.screenshot({ path: filePath});
        return filePath;
    }
}