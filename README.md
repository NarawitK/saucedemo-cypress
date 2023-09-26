# Sauce Demo Cypress Automate Testing
## Description
[Under Construction]

## Software Requirements
1. NodeJS 18.15.0+
2. Cypress 13.2+
3. Web Browser (I'm currently use Edge (Chromium), Firefox and Chrome)
4. JavaScript Package Manager (npm, yarn, pnpm , ...)

## Setup & How to use it
1. Install NodeJS
    1. Please refer to [NodeJS Download Site](https://nodejs.org/en/download)
2. Clone this repo
3. Install Project Dependencies
    - For npm `npm install`
    - For pnpm `pnpm install`
4. Run test as usual or use command in the table below

| **pnpm**                   | Exact Command                                                                        |
|----------------------------|--------------------------------------------------------------------------------------|
| `pnpm run cy:open`         | `cypress open`                                                                       |
| `pnpm run cy:o:e2e:chrome` | `cypress open --e2e --browser=chrome`                                                |
| `pnpm run cy:o:e2e:ff`     | `cypress open --e2e --browser=firefox`                                               |
| `pnpm run cy:r:e2e:chrome` | `cypress run --e2e --browser=chrome --spec=cypress/e2e/1-saucedemo-test/test.cy.js`  |
| `pnpm run cy:r:e2e:ff`     | `cypress run --e2e --browser=firefox --spec=cypress/e2e/1-saucedemo-test/test.cy.js` |

## Optional and Note
You can change some environment variable(s) in `cypress.config.js`
- env : { ... }
**Please note that `testIsolation` set to `false` because this test run as user scenario.**


## Cypress stuck at cy.visit('/') on first Test Case
You have to unregister service worker before run the test
- Firefox
    - Open Dev Tools (F12) or browse to `about:debugging`
    - Unregister service worker
