const os = require('os');
const BrowserFacade = require('../../../helpers/BrowserFacade');
const statePageObjects = require(`../../../page_objects/StatePO.js`);
const statPO = new statePageObjects();

describe(`User should NOT see capital cities or largest cities if they do not choose a state`, () => {

    it(`User should be able to load states portal`, () => {
        browser.driver.get(`file:///${os.userInfo().homedir}/node-rest-states/index.html`);
        BrowserFacade.isPageSettled();
    });

    it(`When user select no state as a choice`, () => {
        BrowserFacade.isPageSettled();
    });

    it(`User should see (nothing) listed as Largest City, or Capital City`, () => {
        statPO.$stateLargestCity.getText().then(function (txt) {
            expect(txt.split(`:`).pop()).toBe(``);
        });
        statPO.$stateCapital.getText().then(function (txt) {
            expect(txt.split(`:`).pop()).toBe(``);
        });
        statPO.$stateName.getText().then(function (txt) {
            expect(txt.split(`:`).pop()).toBe(``);
        });
    });
});


