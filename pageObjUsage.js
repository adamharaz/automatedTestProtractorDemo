/* eslint-env node, jasmine, protractor */
const Navgations = require('../../../page_objects/gwl/Navgations.js');
const burgerMenu = require('../../../modules/cl/NavLinks.js');
const NavLinks = require('../../../modules/cl/NavLinks.js');
const SearchPage = require('../../../modules/cl/SearchPage.js');
const BrowserUtil = require('../../../helpers/BrowserUtil.js');
const GetQuote = require(`../../../modules/idea/GetQuote.js`);
const Meta = require('../../../helpers/Meta.js');

xdescribe('Idea AMEX', () => {
    const $heroTitle = $('h1.hero-title');
    const search = new SearchPage();

    it('should load Idea AMEX site using Safari', () => {
        browser.driver.get(baseUrlAMEX);
        expect($heroTitle.waitReady()).toBeTruthy();
        expect($heroTitle.getText()).toBe(heroTxtAMEX);
    });

    it('should be able to get a quote', () => {
        BrowserUtil.clickElementByTxt('a', 'Get a quote');
        browser.switchTo().frame(0);

        //first Name  dob, gend, tobaccoStat, term, spouse
        // pass 0 for Male and 1 for female
        // pass 0 for a none smoker and 1 for a smoker
        // pass Yes if there is a spouse or No
        GetQuote.calcQuote('Adam', '11/12/1984', 0, 1, 'Critical Illness', 'No');
    });

    it('should verify Meta Tags Attributes', () => {
        Meta.verifyMetaTagsAttributes();
    });
});
