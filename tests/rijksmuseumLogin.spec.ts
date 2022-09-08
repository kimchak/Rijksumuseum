import {expect, test} from "@playwright/test";
import {ArtPiecePage, CollectionsPage, LoginPage, SearchResultsPage} from "../pages";
import {CollectionPage} from "../pages/collection.page";

test.describe('Rijksmuseum UI tests requiring login', () => {
    test.beforeEach(async ({page}) => {
        const login = new LoginPage(page)
        await login.login()
    })

    test('Add 3 art pieces to a collection and remove it', async ({page}) => {
        // const login = new LoginPage(page)
        const results = new SearchResultsPage(page)
        const collections = new CollectionsPage(page)
        const collectionName = Date.now().toString(36)

        // await login.login()
        await results.navigateToUrlQuery('en/search?p=1&ps=12&f.principalMakers.name.sort=Rembrandt+van+Rijn&st=Objects')
        await results.makeACollection(collectionName,3)
        await collections.navigate()
        await expect(await collections.numberOfElementsInCollection(collectionName)).toEqual(3)
        await collections.removeCollection(collectionName)
    })

    test('Add a collection to your favorites and remove it', async ({page}) => {
        // const login = new LoginPage(page)
        const nataliasCollection = new CollectionPage(page)
        const collections = new CollectionsPage(page)

        // await login.login()
        await nataliasCollection.openCollection()
        await nataliasCollection.addCollectionToFavorites()
        await collections.validateCollectionInLoved('super things')
        await nataliasCollection.removeCollectionFromFavorites()
    })

    test('Verify if you can add a creation', async ({page}) => {
        // const login = new LoginPage(page)
        const collections = new CollectionsPage(page)

        // await login.login()
        await collections.addCreation()
        await collections.validateUploadCreationPopup()
    })

    test('Validate ordering prints', async ({page}) => {
        const artPiece = new ArtPiecePage(page)
        await artPiece.navigateToArtId('SK-A-2344')
        await artPiece.orderPrint()
        await artPiece.validatePrintsOrderPopup()
    })
})
