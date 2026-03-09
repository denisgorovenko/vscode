import { test, expect } from '@playwright/test';

import { MainPage } from '../tests/pages/MainPage.ts'; 
import { CartPage } from '../tests/pages/CartPage.ts';
import { CONFIG } from '../tests/common/config.ts';

test.describe(' Ramonki', () => {
    let mainPage: MainPage;
    let cartPage: CartPage;
    const PROD_NAME = "Anastasia";

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        cartPage = new CartPage(page);
        await page.goto(CONFIG.baseUrl);
    });


        test('Тест ', async () => {
            await mainPage.bannerClose();
            await mainPage.openCategory('Платья и сарафаны');
     
            await mainPage.addProductToCart(PROD_NAME, '54');
    

            const modalData = await mainPage.productBlock.getSuccessModalData();
            console.log(modalData.name);
            console.log(modalData.size);
            console.log(modalData.price);

            await mainPage.goToCheckout();
        
            const details = await cartPage.getCartItemDetails(PROD_NAME);
        
            expect(details.name).toContain(modalData.name);
            expect(details.size).toBe(modalData.size);
            expect(details.price).toBe(modalData.price);

        });
    
});