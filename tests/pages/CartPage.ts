import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getCartItem(name: string): Locator {
        return this.page.locator('li.cart-item', { hasText: name });
    }

    async getCartItemDetails(name: string) {
        const item = this.getCartItem(name);
        
      
        const infoTexts = await item.locator('.cart-item__text').allInnerTexts();
        const price = await item.locator('.cart-item__price').innerText();

        return {
            name: infoTexts.find(t => t.includes(name)),
            size: infoTexts.find(t => t.includes('Размер'))?.replace('Размер', '').trim(),
            price: price.trim()
        };
    }
}