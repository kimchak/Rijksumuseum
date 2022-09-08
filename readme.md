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

Rijksustudio presents a few challenges for UI automation, the first one
being the calk of automation-friendly ids and data-testids. This required some workarrounds, as many identifiers were not unique, and text selectors or css pseudo-classes like `:visible` had to be used for element selection.
The page also seems to be having some performance issues and some tests were timing out during development. This required increasing standard timeouts from 30s to 60s per test.
There is a bugged flow is advanced search, that does not allow the automated suite, and in some cases physical user, using the advanced search engine. The search button, instead of sending a search request clears the form data and redirects to current page.
The workflows to achieving certain states are relatively long, which might lead to unstability, it would be much more effective to setup test data using API calls, which in this case are not publicly available.
Presented test suite is not complete, and it would require many more tests to cover the application sufficiently.
One improvement worth making is changing the login action to use SSO wit .ASP and saving identification tokens in browser's context. The current solution, that uses UI login increases each test's execution time and does not provide added value.
