import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class AdvancedSearchPage extends BasePage {
    public readonly advancedSearchInput: Locator
    public readonly searchInputMaker: Locator
    public readonly searchInputPlace: Locator
    public readonly searchInputMaterial: Locator
    public readonly searchInputMaterialDropdown: Locator
    public readonly searchInputPeriodStart: Locator
    public readonly searchInputPeriodEnd: Locator
    public readonly searchButton: Locator

    constructor(page: Page) {
        super(page)
        this.advancedSearchInput = page.locator('#advanced-search-field')
        this.searchInputMaker = page.locator('#token-input-QueryDescriptor_AdvancedSearchOptions_ArtistCriteria_InvolvedMakerName')
        this.searchInputPlace = page.locator('#atoken-input-QueryDescriptor_AdvancedSearchOptions_ArtistCriteria_CountryOrPlace')
        this.searchInputMaterial = page.locator('#token-input-QueryDescriptor_AdvancedSearchOptions_ObjectCriteria_Material')
        this.searchInputMaterialDropdown = page.locator('ul.list-roomy.list-links a')
        this.searchInputPeriodStart = page.locator('#QueryDescriptor_AdvancedSearchOptions_ObjectCriteria_DatingPeriod_StartDate')
        this.searchInputPeriodEnd = page.locator('#QueryDescriptor_AdvancedSearchOptions_ObjectCriteria_DatingPeriod_EndDate')
        this.searchButton = page.locator('input[value="Find"]')
    }

    async navigate() {
        await this.page.goto('/en/search/advanced')
        await super.acceptCookies()
    }

    async fillSearchKeyword(keyword: string) {
        await this.advancedSearchInput.type(keyword, {delay: 40})
    }

    async fillMaterialBox(material: string) {
        await this.searchInputMaterial.type(material, {delay: 40})
        // await this.page.$(`a[name="facet"]:has-text('${material}')`)
        await this.searchInputMaterialDropdown.click()
    }

}
