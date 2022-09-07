import {expect, Locator, Page} from "@playwright/test"
import {BasePage} from "./base.page"

export class CollectionsPage extends BasePage {
    public readonly collectionTiles: Locator
    public readonly editSetButton: Locator
    public readonly deleteCollectionButton: Locator
    public readonly confirmDeleteButton: Locator
    public readonly closeOnboardingPopup: Locator
    public readonly onboardingPopup: Locator

    constructor(page: Page) {
        super(page)
        this.collectionTiles = page.locator('figure[data-item-index]')
        this.editSetButton = page.locator('[data-role="edit-set"]')
        this.deleteCollectionButton = page.locator('[data-role="set-delete"]')
        this.confirmDeleteButton = page.locator('[data-role="dialog-ok-button"]')
        this.onboardingPopup = page.locator('[data-role="tour-template"]:visible')
        this.closeOnboardingPopup = page.locator('[data-role="tour-template"] [data-role="lightbox-close"]:visible')
    }

    async navigate() {
        this.page.goto('/en/rijksstudio/my')
    }

    async dismissOnboarding() {
        if (this.onboardingPopup.isVisible()) {
            this.closeOnboardingPopup.click()
        }
    }

    async numberOfElementsInCollection(collectionName: string): Promise<number> {
        const targetTile = await this.collectionTiles.filter({hasText: collectionName})
        const numberOfItems = await targetTile.locator('p.text-subtle').innerText().then(res => res.charAt(0))
        console.log(numberOfItems)
        return Number(numberOfItems)
    }

    async removeCollection(collectionName: string) {
        const targetTile = await this.collectionTiles.filter({hasText: collectionName})
        await targetTile.click()
        await this.page.pause()
        await this.dismissOnboarding()
        await this.editSetButton.click()
        await this.deleteCollectionButton.click()
        await this.confirmDeleteButton.click()
        await expect(targetTile).not.toBeVisible()
    }
}
