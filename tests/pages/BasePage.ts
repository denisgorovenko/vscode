import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    constructor(protected page: Page) {}

    async clickOnElement(locator: Locator) {
        await locator.click();
    }

    async setTextOnElement(locator: Locator, text: string) {
        await locator.fill(text);
    }

    async pause(sec: number) {
        await this.page.waitForTimeout(sec * 1000);
    }
}