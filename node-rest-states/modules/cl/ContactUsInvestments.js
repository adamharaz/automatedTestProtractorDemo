/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $burgerMenu = $$('span[role="presentation"]').get(0);
const $heroTitle = $('h1.hero-title');
const $contactusHeader = $('h3.contact-subpage-header');


class ContactUsInvestments {
    verifyContactusMenu(tab, optionValue, textToExpect) {
        if (!textToExpect) {
            textToExpect = optionValue;
        }
        expect($heroTitle.waitReady()).toBeTruthy();
        expect($heroTitle.getText()).toBe('Contact us');
        BrowserUtil.clickElementByTxt('a', tab);
        BrowserUtil.selectOptionFromDropMenu(optionValue);
        if (optionValue !== 'suppliers' && optionValue !== 'Webmaster') {
            expect($contactusHeader.waitReady()).toBeTruthy();
            browser.wait(() => $contactusHeader.getText().then(value =>
                value === textToExpect));
            expect($contactusHeader.getText()).toBe(textToExpect);
        }
    };
}

module.exports = ContactUsInvestments;