import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductBlock } from '../blocks/ProductBlock';

export class MainPage extends BasePage {
    readonly catalogBtn: Locator;
    readonly productBlock: ProductBlock;
    readonly appModal : Locator;
    readonly appModalClose : Locator;

    constructor(page: Page) {
        super(page);
        this.catalogBtn = page.locator('.bottom-bar .catalog-button');
        this.appModal = page.locator('.app-modal');
        this.appModalClose = page.locator('.v-modal__close');
        this.productBlock = new ProductBlock(page);


    }

    async bannerClose() {
        await this.appModal.waitFor({ state: 'visible', timeout: 10000 });
        await this.appModalClose.click();
    
    }

    async openCategory(categoryName: string) {
        
        await this.catalogBtn.click();
        await this.page.waitForTimeout(3000);
        await this.page.locator('.bottom-bar .drop-menu--catalog').waitFor({ state: 'visible', timeout: 6000 });
        await this.page.locator('.bottom-bar .drop-menu--catalog').getByRole('link', { name: categoryName }).click();
        await this.page.waitForTimeout(6000);
    }

    async addProductToCart(name: string, size: string) {
        await this.productBlock.clickBuyButton(name);
        await this.productBlock.setSize(size);
        await this.productBlock.submitBtn.click();
    }

    async goToCheckout() {
        await this.productBlock.checkoutBtn.click();
    }
}