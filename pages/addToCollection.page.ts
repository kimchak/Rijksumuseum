import {expect, Locator, Page} from "@playwright/test"
import {BasePage} from "./base.page"

export class AddToCollectionPage extends BasePage {
    public readonly addNewCollectionButton: Locator
    public readonly addedToCollectionToast: Locator
    public readonly collectionNameInput: Locator
    public readonly confirmCollectionAddButton: Locator
    public readonly existingCollections: Locator
    protected artInCollectionCount = 0

    constructor(page: Page) {
        super(page)
        this.addNewCollectionButton = page.locator('[data-role="add-new-set-open-editor"]')
        this.addedToCollectionToast = page.locator('[data-role="confirmation"]')
        this.existingCollections = page.locator('[data-role="add-object-to-existing-set"]')
        this.collectionNameInput = page.locator('#verzameling-input')
        this.confirmCollectionAddButton = page.locator('input[value="Add"]')
    }

    async addToNewCollection(collectionName: string) {
        await this.addNewCollectionButton.click()
        await this.collectionNameInput.type(collectionName)
        await this.confirmCollectionAddButton.click()
        await expect(this.addedToCollectionToast).toBeVisible()
        this.artInCollectionCount=1
    }

    async addToExistingCollection(collectionName: string) {
        await this.existingCollections.filter({hasText: collectionName}).click()
        this.artInCollectionCount++
        await expect(this.addedToCollectionToast).toContainText(`${this.artInCollectionCount} objects)`)
    }
}
