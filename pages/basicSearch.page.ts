import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class BasicSearchPage extends BasePage {
    public readonly searchInput: Locator
    public readonly searchButton: Locator
    public readonly advancedSearchLink: Locator

    constructor(page: Page) {
        super(page)
        this.searchInput = page.locator('[data-role="autosuggest-input"]')
        this.searchButton = page.locator('[data-role="autosuggest-submit"]')
        this.advancedSearchLink = page.locator('a[href="/en/search/advanced?p=1&ps=12&st=Objects"]')
    }

    async navigate() {
        await this.page.goto('en/search')
        await super.acceptCookies()
    }

    async search(keyword: string) {
        await this.searchInput.fill(keyword)
        await this.searchButton.click()
    }

}
