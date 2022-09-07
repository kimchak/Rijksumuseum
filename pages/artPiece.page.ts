import {expect, Locator, Page} from "@playwright/test"
import {BasePage} from "./base.page"

export class ArtPiecePage extends BasePage {
    public readonly details: Locator
    public readonly creationDate: Locator
    public readonly advancedSearchLink: Locator
    public readonly tags: Locator

    constructor(page: Page) {
        super(page)
        this.details = page.locator('[data-role="scroll-to-object-data"]')
        this.creationDate = page.locator('article:has-text("Creation") div.item:has-text("Dating") p.item-data')
        this.advancedSearchLink = page.locator('a[href="/en/search/advanced?p=1&ps=12&st=Objects"]')
        this.tags = page.locator('[data-role="tag-list"]:visible')
    }

    async navigateToArtId(id: string) {
        await this.page.goto(`en/collection/${id}`)
        await super.acceptCookies()
    }

    async viewDetails() {
        await this.details.click()
    }

    async validateArtCreationDateIs(date: string) {
        await expect(await this.creationDate.innerText()).toEqual(date)
    }

    async validateLocationIs(galleryName: string) {
        await expect(this.tags).toContainText(galleryName)
    }

}
