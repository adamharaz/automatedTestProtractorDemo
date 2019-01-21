const BrowserUtil = require('../../../helpers/BrowserUtil.js');
const Images = require('../../../helpers/Images.js');
const os = require('os');
const argv = require('optimist').argv;
const BrowserFacade = require('../../../helpers/BrowserFacade');
const StatesInfo = require(`../../../params/statesInfo.js`);
const statePageObjects = require(`../../../page_objects/StatePO.js`);
const statPO = new statePageObjects();

describe(`User should be able to use the dropdown menu to look up states capital cities and their largest cities`, () => {

    it(`User should be able to load states portal`, () => {
        browser.driver.get(`file:///${os.userInfo().homedir}/node-rest-states/index.html`);
        BrowserFacade.isPageSettled();
    });

    for (let i = 0; i < StatesInfo.RestResponse.result.length; i++) {   //StatesInfo.RestResponse.result.length
        it(`Once page loaded, user can select (${StatesInfo.RestResponse.result[i].name})`, () => {
            BrowserUtil.clickElementByTxt(`option`, StatesInfo.RestResponse.result[i].name);
            BrowserFacade.isPageSettled();
        });

        it(`Once (${StatesInfo.RestResponse.result[i].name}) selected
                user should see (You Selected State) and the state selected next to it, `, () => {
            statPO.$stateName.getText().then(function (txt) {
                expect(txt.split(`:`).pop()).toBe(StatesInfo.RestResponse.result[i].name);
            });
        });

        it(`User should also see (${StatesInfo.RestResponse.result[i].capital})
                as its capital, `, () => {
            statPO.$stateCapital.getText().then(function (txt) {
                expect(txt.split(`:`).pop()).toBe(StatesInfo.RestResponse.result[i].capital);
            });
        });

        it(`User should also see (${StatesInfo.RestResponse.result[i].largest_city})
                as its Largest City, `, () => {
            statPO.$stateLargestCity.getText().then(function (txt) {
                expect(txt.split(`:`).pop()).toBe(StatesInfo.RestResponse.result[i].largest_city);
            });
        });
    }

});


