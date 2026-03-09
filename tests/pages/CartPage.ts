import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getCartItem(name: string): Locator {
        return this.page.locator('li.cart-item').filter({ hasText: name });
    }

    async getCartItemDetails(name: string) {
        const item = this.getCartItem(name).first();
        
        await item.waitFor({ state: 'visible', timeout: 7000 });

        const infoTexts = await item.locator('.cart-item__text').allInnerTexts();
        
        const priceElement = this.page.locator('.cart .order-form__text--total, .cart .order-form__text--total>span');
        const price = await priceElement.last().innerText();

        const foundName = infoTexts.find(t => t.toLowerCase().includes(name.toLowerCase()));
        
        const sizeString = infoTexts.find(t => t.includes('Размер'));

        return {
            name: foundName || "", 
            size: sizeString ? sizeString.replace('Размер', '').trim() : "Размер не найден",
            price: price ? price.trim() : ""
        };
    }
}