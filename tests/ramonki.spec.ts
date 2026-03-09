import { test, expect } from '@playwright/test';

import { MainPage } from '../tests/pages/MainPage.ts'; 
import { CartPage } from '../tests/pages/CartPage.ts';
import { CONFIG } from '../tests/common/config.ts';

test.describe('Проверка корзины Ramonki', () => {
    let mainPage: MainPage;
    let cartPage: CartPage;
    const PROD_NAME = "Anastasia";

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        cartPage = new CartPage(page);
        await page.goto(CONFIG.baseUrl);
    });

    test('Добавление платья в корзину', async () => {
        await mainPage.bannerClose();

        await mainPage.openCategory('Платья и сарафаны');

        
        await mainPage.addProductToCart(PROD_NAME, '46');

       
        await mainPage.goToCheckout();

        
        const details = await cartPage.getCartItemDetails(PROD_NAME);
        
        expect(details.name).toContain(PROD_NAME);
        expect(details.size).toBe('46');
        expect(details.price).toBe('122.76 BYN');
    });
});