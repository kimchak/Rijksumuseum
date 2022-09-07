# Smoke test POC for Rijksstudio with Playwright and Newman

## Overview
This repository is made to demonstrate automation possibilities for Rijksmuseum's Rijksstudio website and API using Playwright
and TypeScript for UI automation and Postman/Newman for API tests. Playwright was used, because is a fast, lightweight and modern framework.
The test suite covers the following cases, which were provided in requirements, as well as additional tests providing site's stability.

## Covered test cases
### Common cases for API and UI
1. Search for  Rembrandt van Rijn should return at least 10 results
2. Advanced search for Hilversum on canvas from XVII century
3. Validate details of The Milkmaid

### API-specific tests
4. GET Art objects possessed in a given period   
    This call can be used to retreive art objects possessed by the museum in a given period.
It utilizes the OAI-PMH API described [here](https://data.rijksmuseum.nl/object-metadata/harvest/)

### UI-specific tests
5. Add 3 art pieces by Rembrand van Rijn to a collection
6. Remove a collection


### Security
The project-specific security login credentials are stored safely in Github environment and are not exposed anywhere in the code.

## How to run UI tests
### Run locally
- Clone the repo
- In the main directory provide a `.env` file in which you'll save login credentials for login. You will need an `EMAIL=****@***.**` and `PASSWORD="****"` fields. 
- Install dependencies with `npm i`
- Run the test with `npm run test`

### Run in Github Actions
- Go to Actions tab in the repo on Github
- Select Playwright Tests workflow and click `run workflow`
- Wait until tests completes, download the generated report from artifacts, under the completed workflow

## How to run API tests
### Run locally
- Clone the repo
- Install dependencies with `npm i`
- Run the test with `npm run test:api`

### Run in Github Actions
- Go to Actions tab in the repo on Github
- Select Newman API Tests workflow and click `run workflow`
- Wait until tests completes and see the results in the workflow

## Challenges and further improvements
- Flaky > set retries
- no ids
- bugged advanced search
- login
- 
The tests are meant to be a starting point for building a more extensive tests suite, however 
they do provide feedback about the condition of basic/core features. We only test the buy/koop part of the
system, since the functionality of the rental part is very similar to it.
In case of the search mechanism, UI tests have been implemented here, but generally it's better to test this feature on an integration/unit test level.
The suite can be extended, adding more tests covering more specific use cases.
One of the challenges with the automation was that a lot of elements didn't have unique ids or data-test-ids. Instead some vue-specific attributes were used. It would be recommended to provide those additional ids, in order to enhance stability. This can be easily done by a front-end or a QA developer with access to the front-end repository. 

