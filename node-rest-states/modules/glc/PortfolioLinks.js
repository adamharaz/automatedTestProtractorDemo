/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');

class PortfolioLinks {

    static VerifyPortfolio(portfolioLink, textToBeVerified) {

        const $heroTitle = $('div.hero-content').$('h1.hero-title');

        expect(portfolioLink.waitReady()).toBeTruthy();
        portfolioLink.click();
        browser.sleep(1200);
        expect($heroTitle.waitReady()).toBeTruthy();
        expect($heroTitle.getText()).toBe(textToBeVerified);
        browser.driver.navigate().back();
        BrowserUtil.isPageSettled(`Portfolio Solutions Group`, $heroTitle);
    };
}

module.exports = PortfolioLinks;