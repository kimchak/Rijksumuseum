import {expect, Locator, Page} from '@playwright/test'

export class BasePage {
    readonly page: Page
    public readonly acceptCookiesButton: Locator
    public readonly cookiePopup: Locator
    public readonly userAvatar: Locator
    public readonly closeOnboardingPopup: Locator
    public readonly onboardingPopup: Locator

    constructor(page: Page) {
        this.page = page
        this.acceptCookiesButton = page.locator('button[value="Accept"]')
        this.cookiePopup = page.locator('[data-role="cookie-bar"]')
        this.onboardingPopup = page.locator('[data-role="tour-template"]:visible')
        this.closeOnboardingPopup = page.locator('[data-role="tour-template"] [data-role="lightbox-close"]:visible')
    }

    async acceptCookies() {
        if (await this.cookiePopup.isVisible()) {
            await this.acceptCookiesButton.click()
            await expect(this.cookiePopup).not.toBeVisible()
        }
    }

    async dismissOnboarding() {
        if (await this.onboardingPopup.isVisible()) {
            await this.closeOnboardingPopup.click()
        }
    }

    async navigate(urlSuffix='') {
        await this.page.goto(urlSuffix)
        await this.acceptCookies()
    }
}
