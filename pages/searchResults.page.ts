import {expect, Locator, Page} from '@playwright/test'
import {BasePage} from './base.page'
import {AddToCollectionPage} from "./addToCollection.page";

export class SearchResultsPage extends BasePage {
    public readonly resultsCount: Locator
    public readonly resultTiles: Locator
    protected readonly addCollection: AddToCollectionPage


    constructor(page: Page) {
        super(page)
        this.resultsCount = page.locator('a:has-text("works")')
        this.resultTiles = page.locator('[data-item-index]')
        this.addCollection = new AddToCollectionPage(page)
    }

    async addNthObjectToCollection(index: number) {
        await this.resultTiles.nth(index).hover()
        await this.resultTiles.nth(index).locator('[data-role="media-actions add-object-to-set"]').click()
    }

    async makeACollection(name: string, size: number) {
        await this.addNthObjectToCollection(0)
        await this.addCollection.addToNewCollection(name)
        for (let i = 1; i < size; i++) {
            await this.addNthObjectToCollection(i)
            await this.addCollection.addToExistingCollection(name)
        }
    }

    async validateResultsCountIsAtLeast(count: number) {
        const unparsedText = await this.resultsCount.innerText()
        const parsedText = unparsedText.replace(',', '').replace(' works', '')
        await expect(Number(parsedText)).toBeGreaterThanOrEqual(count)
    }
}
