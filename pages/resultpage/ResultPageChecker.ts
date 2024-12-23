import { expect } from '@playwright/test';
import { BasePageChecker } from "../base/BasePageChecker";
import { ResultPage } from './ResultPage';
import * as fs from 'fs';
import path from 'path';

export class ResultPageChecker extends BasePageChecker {
    readonly page: ResultPage;
    readonly MAX_BYTES: number = 500000;

    constructor(page: ResultPage) {
        super(page);
        this.page = page;
    }

    async resultPageTitleIsVisible() {
        await expect(this.page.ResultPageTitle).toBeVisible();
    }

    async titleNameIsVisible(name: string) {
        await expect(this.page.ResultPageTitle).toContainText(name, { ignoreCase: true });
    }

    async checkFileSizeByName(savedImagePath: string) {
        const extensionType = path.extname(savedImagePath);
        const fileStat = fs.statSync(savedImagePath);
        const fileSizeInBytes = fileStat.size;
        await expect(fileSizeInBytes, 'File size greather than permited').not.toBeGreaterThan(this.MAX_BYTES);
        await expect(extensionType.match(/\.(jpg|jpeg|png|gif)$/i), 'Not supported image type').toBeTruthy();
    }
}