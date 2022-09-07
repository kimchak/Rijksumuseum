import {expect, Locator, Page} from '@playwright/test'

export class BasePage {
    readonly page: Page
    public readonly acceptCookiesButton: Locator
    public readonly cookiePopup: Locator
    public readonly userAvatar: Locator

    constructor(page: Page) {
        this.page = page
        this.acceptCookiesButton = page.locator('button[value="Accept"]')
        this.cookiePopup = page.locator('[data-role="cookie-bar"]')
    }

    async acceptCookies() {
        if (await this.cookiePopup.isVisible()) {
            await this.acceptCookiesButton.click()
            await expect(this.cookiePopup).not.toBeVisible()
        }
    }

    async navigate(urlSuffix='') {
        await this.page.goto(urlSuffix)
        await this.acceptCookies()
    }
}

