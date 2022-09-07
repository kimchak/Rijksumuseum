import {expect, Page, test} from '@playwright/test'
import {
    BasicSearchPage,
    SearchResultsPage,
    LoginPage,
    ArtPiecePage,
    CollectionsPage
} from 'pages'
import {AdvancedSearchPage} from "../pages/advancedSearch.page";


test.describe('Rijksmuseum UI tests', () => {
    // test.skip(async ({page}) => {
    //     const login = new LoginPage(page)
    //     await login.navigate()
    //     await login.login()
    //     await page.pause()
    // })

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

    test.only('Validate details of The Milkmaid', async ({page}) => {
        const artPiece = new ArtPiecePage(page)
        await artPiece.navigateToArtId('SK-A-2344')
        await artPiece.viewDetails()
        await artPiece.validateArtCreationDateIs('c. 1660')
        await artPiece.validateLocationIs('Gallery of Honour')
    })

    test('Add 3 art pieces to a collection then remove collection', async ({page}) => {
        const login = new LoginPage(page)
        const search = new BasicSearchPage(page)
        const results = new SearchResultsPage(page)
        const collections = new CollectionsPage(page)
        const collectionName = Date.now().toString(36)

        await login.login()

        await search.directSearch('en/search?p=1&ps=12&f.principalMakers.name.sort=Rembrandt+van+Rijn&st=Objects')
        await results.makeACollection(collectionName,3)
        await collections.navigate()
        await expect(await collections.numberOfElementsInCollection(collectionName)).toEqual(3)
        await collections.removeCollection(collectionName)
    })
})
