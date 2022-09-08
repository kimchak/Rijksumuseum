import { Page, test} from '@playwright/test'
import {
    BasicSearchPage,
    SearchResultsPage,
    ArtPiecePage,
} from 'pages'
import {AdvancedSearchPage} from "pages/advancedSearch.page";


test.describe('Rijksmuseum UI tests without login', () => {

    test('Search for  Rembrandt van Rijn should return at least 10 results', async ({page}) => {
        const search = new BasicSearchPage(page)
        const results = new SearchResultsPage(page)

        await search.navigate()
        await search.search('Rembrandt van Rijn')
        await results.validateResultsCountIsAtLeast(10)
    })


    test.fixme('Advanced search for Hilversum on canvas from XVII century', async ({page}) => {
        const advancedSearch = new AdvancedSearchPage(page)

        await advancedSearch.navigate()
        await advancedSearch.fillSearchKeyword('Hilversum')
        await advancedSearch.fillMaterialBox('canvas')
        await advancedSearch.searchInputPeriodStart.type('1600', {delay: 40})
        await advancedSearch.searchInputPeriodEnd.type('1700', {delay: 40})
        await advancedSearch.searchButton.click()
    })

    test('Validate details of The Milkmaid', async ({page}) => {
        const artPiece = new ArtPiecePage(page)
        await artPiece.navigateToArtId('SK-A-2344')
        await artPiece.viewDetails()
        await artPiece.validateArtCreationDateIs('c. 1660')
        await artPiece.validateLocationIs('Gallery of Honour')
    })
})
