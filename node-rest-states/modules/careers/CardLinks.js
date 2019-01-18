/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const BrowserFacade = require('../../helpers/BrowserFacade.js');
const $heroTitle = $('h1.hero-title');

class CardLinks {

    verifyCardLink(cardHeading, text) {

        // BrowserUtil.clickElementByTxt('span', `Menu`);
        BrowserUtil.clickElementByTxt('a', cardHeading);
        BrowserFacade.isPageSettled();
      /*  expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === text));
        expect($heroTitle.getText()).toBe(text);*/
        browser.driver.get(baseUrl);
        BrowserFacade.isPageSettled();
        /*browser.wait(() => $heroTitle.getText().then(value =>
            value === 'Discover your opportunity'));
        expect($heroTitle.getText()).toBe('Discover your opportunity');*/
    };
}

module.exports = CardLinks;