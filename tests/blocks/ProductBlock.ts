import { Page, Locator } from '@playwright/test';

export class ProductBlock {
    constructor(private page: Page) {}

   
    getProductCard(name: string): Locator {
        return this.page.locator('.product-card__content', { hasText: name });
    }

    async clickBuyButton(productName: string) {
        const card = this.getProductCard(productName);
        console.log(card.isVisible);
        await this.page.waitForTimeout(3000);
        await card.scrollIntoViewIfNeeded();
        await card.locator('.product-card-description__buy').click();
    }

    async setSize(size: string) {
        const sizeOption = this.page.locator('.options-selector__item', { hasText: size });
        await sizeOption.click();
    }

    get submitBtn() { return this.page.locator('button[type="button"]'); }
    get checkoutBtn() { return this.page.locator('button.button', { hasText: 'Оформить' }); }
}