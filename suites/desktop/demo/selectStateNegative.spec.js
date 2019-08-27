const os = require('os');
const BrowserFacade = require('../../../helpers/BrowserFacade');
const statePageObjects = require(`../../../page_objects/StatePO.js`);
const Images = require('../../../helpers/Images.js');
const statPO = new statePageObjects();

describe(`User should NOT see capital cities or largest cities if they do not choose a state`, () => {

    it(`User should be able to load states portal`, () => {
        browser.driver.get(`file:///${os.userInfo().homedir}/Documents/e2e/automatedTestProtractorDemo/index.html`);
        BrowserFacade.isPageSettled();
    });

    it(`When user select no state as a choice`, () => {
        const img2 = `${os.userInfo().homedir}/Documents/e2e/automatedTestProtractorDemo/actual_images/NoStateSelected.png`;
        BrowserFacade.isPageSettled();
        Images.takeFullScreenshotForCurrentUrl(img2);
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


