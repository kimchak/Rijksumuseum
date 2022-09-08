import {expect, Locator, Page} from "@playwright/test"
import {BasePage} from "./base.page"

export class CollectionsPage extends BasePage {
    public readonly collectionTiles: Locator
    public readonly editSetButton: Locator
    public readonly deleteCollectionButton: Locator
    public readonly confirmDeleteButton: Locator
    public readonly closeOnboardingPopup: Locator
    public readonly lovedCollections: Locator
    public readonly onboardingPopup: Locator
    public readonly creations: Locator
    public readonly creationsTiles: Locator
    public readonly uploadCreationPopup: Locator

    constructor(page: Page) {
        super(page)
        this.collectionTiles = page.locator('figure[data-item-index]')
        this.editSetButton = page.locator('[data-role="edit-set"]')
        this.deleteCollectionButton = page.locator('[data-role="set-delete"]')
        this.confirmDeleteButton = page.locator('[data-role="dialog-ok-button"]')
        this.onboardingPopup = page.locator('[data-role="tour-template"]:visible')
        this.closeOnboardingPopup = page.locator('[data-role="tour-template"] [data-role="lightbox-close"]:visible')
        this.lovedCollections = page.locator('a[href*="/loves"]')
        this.creations = page.locator('a[href*="/creations"]')
        this.creationsTiles = page.locator('[data-role="open-upload-creations"]')
        this.uploadCreationPopup = page.locator('form[data-role="upload-creations"]')
    }

    async navigate() {
        await this.page.goto('/en/rijksstudio/my')
    }

    async numberOfElementsInCollection(collectionName: string): Promise<number> {
        const targetTile = await this.collectionTiles.filter({hasText: collectionName})
        const numberOfItems = await targetTile.locator('p.text-subtle').innerText().then(res => res.charAt(0))
        return Number(numberOfItems)
    }

    async removeCollection(collectionName: string) {
        const targetTile = await this.collectionTiles.filter({hasText: collectionName})
        await targetTile.click()
        await this.page.waitForLoadState()
        await this.dismissOnboarding()
        await this.editSetButton.click()
        await this.deleteCollectionButton.click()
        await this.confirmDeleteButton.click()
        await expect(targetTile).not.toBeVisible()
    }

    async validateCollectionInLoved(collectionName: string) {
        await this.navigate()
        await this.lovedCollections.click()
        const textToValidate = await this.collectionTiles.allInnerTexts()
        expect(textToValidate[0]).toContain(collectionName)
    }

    async addCreation() {
        await this.creations.click({force: true})
        await this.creations.click()
        await this.creationsTiles.nth(0).click()
    }

    async validateUploadCreationPopup(){
        await expect(this.uploadCreationPopup).toBeVisible()
    }
}
