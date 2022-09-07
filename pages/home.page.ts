import {Locator, Page} from '@playwright/test'
import {BasePage} from './base.page'

export class HomePage extends BasePage {
    public readonly searchRijksstudioButton: Locator
    public readonly loginButton: Locator

    constructor(page: Page) {
        super(page)
        this.searchRijksstudioButton = page.locator('a[href="/en/search"]')
        this.loginButton = page.locator('a[href="https://www.rijksmuseum.nl/en/login?redirectUrl=https://www.rijksmuseum.nl"]')
    }

    async navigate() {
        await this.page.goto('/riksstudio')
    }
}
