import {Locator, Page} from '@playwright/test'
import {BasePage} from './base.page'

export class LoginPage extends BasePage {
    public readonly emailInput: Locator
    public readonly passwordInput: Locator
    public readonly submitButton: Locator

    constructor(page: Page) {
        super(page)
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('#wachtwoord')
        this.submitButton = page.locator('button[type="submit"]')
    }

    async navigate() {
        await this.page.goto('en/login')
        await super.acceptCookies()
    }

    async login() {
        await this.navigate()
        await this.emailInput.fill(process.env.EMAIL)
        await this.passwordInput.fill(process.env.PASSWORD)
        await this.submitButton.click()
        await this.page.waitForNavigation()
    }
}
