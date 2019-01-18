/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $burgerMenu = $$('span[role="presentation"]').get(0);
const $heroTitle = $('h1.hero-title');
const QuotePage = require(`../../page_objects/idea/QuotePage.js`);
const page = new QuotePage();
const $cardTitle = $(`h2.preview-list-title`);

class Cards {

    static verifyCard(cardTitle, heroTitleTxt) {
        BrowserUtil.clickElementByTxt(`h2.card-title`, cardTitle.toUpperCase());

        expect($cardTitle.waitReady()).toBeTruthy();
        browser.wait(() => $cardTitle.getText().then(value =>
            value === cardTitle));
        expect($cardTitle.getText()).toBe(cardTitle);

        browser.navigate().back();
        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === heroTitleTxt));
        expect($heroTitle.getText()).toBe(heroTitleTxt);
    }
}

module.exports = Cards;