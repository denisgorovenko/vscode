import { Page, Locator } from '@playwright/test';

export class ProductBlock {
    constructor(private page: Page) {}

   
    getProductCard(name: string): Locator {
    
    return this.page.locator('.product-card__content').filter({ hasText: name });
        }

    async clickBuyButton(productName: string) {

        const card = this.getProductCard(productName).first();
        
    
        await card.waitFor({ state: 'visible' });
        

        await card.scrollIntoViewIfNeeded();
        
        await card.locator('.product-card__buy').first().click();
    }

    async setSize(size: string) {
        const sizeOption = this.page.locator('.options-selector__item', { hasText: size });
        await sizeOption.click();
    }

    get submitBtn() { return this.page.locator('button[type="button"]'); }
    get checkoutBtn() { return this.page.locator('button.button', { hasText: 'Оформить' }); }


    async getSuccessModalData() {
    const modal = this.page.locator('.success-add-modal__info');
    
    await modal.waitFor({ state: 'visible' });

    const lines = await modal.locator('p').allInnerTexts();
    
    const data: Record<string, string> = {};


    data['name'] = lines[0]; 
    data['price'] = lines[1]; 

    for (let i = 2; i < lines.length; i++) {
        const text = lines[i];
        
        if (text.includes('Размер')) {
            data['size'] = text.replace('Размер', '').trim();
        } else if (text.includes('Рост')) {
            data['height'] = text.replace('Рост', '').trim();
        } else if (text.includes('артикул')) {
            data['article'] = text.replace('артикул', '').trim();
        }
    }

    return data;
}
}