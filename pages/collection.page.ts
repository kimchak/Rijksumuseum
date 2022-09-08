import {expect, Locator, Page} from "@playwright/test"
import {BasePage} from "./base.page"

export class CollectionPage extends BasePage {
    public readonly collectionTiles: Locator
    public readonly likesCountTag: Locator
    public readonly likeCollectionButton: Locator
    public readonly closeOnboardingPopup: Locator
    public readonly onboardingPopup: Locator

    constructor(page: Page) {
        super(page)
        this.likeCollectionButton = page.locator('[data-role="like-set"]')
        this.likesCountTag = page.locator('[data-button="icon-im-star icon-before"]')
        this.onboardingPopup = page.locator('[data-role="tour-template"]:visible')
        this.closeOnboardingPopup = page.locator('[data-role="tour-template"] [data-role="lightbox-close"]:visible')
    }

    async openCollection(collectionUrl: string = '/2980521--natalia-derewicz/collections/super-things') {
        await this.page.goto(`/en/rijksstudio/${collectionUrl}`)
        await this.dismissOnboarding()
    }

    async addCollectionToFavorites() {
        const likersCount = await this.likesCountTag.innerText()
        await this.likeCollectionButton.click()
        await expect(likersCount).not.toEqual(await this.likesCountTag.innerText())
    }

    async removeCollectionFromFavorites(collectionUrl: string = '/2980521--natalia-derewicz/collections/super-things') {
        await this.openCollection(collectionUrl)
       await this.addCollectionToFavorites()
    }
}
