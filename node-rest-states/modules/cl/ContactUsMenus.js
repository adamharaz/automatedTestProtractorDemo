/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $burgerMenu = $$('span[role="presentation"]').get(0);
const $heroTitle = $('h1.hero-title');
const $contactusHeader = $('h2.contact-subpage-header');
const $headerRichTxt = $$('div.rich-text-component').get(0).$('h3');
const $headerRichTxt2 = element(by.xpath('//*[@id="main"]/div[2]/div/div/div/div/div[2]/div[2]/article/div/article/div/div/div/h2'));

class ContactUsMenus {
    verifyContactusMenu(contactUsTitle, tab, optionValue, textToExpect) {
        if (!textToExpect) {
            textToExpect = optionValue;
        }
        if (tab) {
            expect($heroTitle.waitReady()).toBeTruthy();
            // expect($heroTitle.getText()).toBe(contactUsTitle);
            BrowserUtil.clickElementByTxt('a', tab);
            browser.sleep(1200);
        }
        BrowserUtil.selectOptionFromDropMenu(optionValue);
        if (optionValue !== 'suppliers' && optionValue !== 'Webmaster' && optionValue !== 'Interested in our products' && optionValue !== 'Group benefits') {
            expect($contactusHeader.waitReady()).toBeTruthy();
            browser.wait(() => $contactusHeader.getText().then(value =>
                value === textToExpect));
            // browser.sleep(3333);
            expect($contactusHeader.getText()).toBe(textToExpect);
        } else if (optionValue === 'Interested in our products') {
            expect($headerRichTxt.waitReady()).toBeTruthy();
            browser.wait(() => $headerRichTxt.getText().then(value =>
                value === textToExpect));
            expect($headerRichTxt.getText()).toBe(textToExpect);
        } else if (optionValue === 'Group benefits') {
            expect($headerRichTxt2.waitReady()).toBeTruthy();
            browser.wait(() => $headerRichTxt2.getText().then(value =>
                value === textToExpect));
            expect($headerRichTxt2.getText()).toBe(textToExpect);
        }
    };

    chooseOption(option) {
        const $optioinSelected = $('input[value="' + option + '"]');
        expect($optioinSelected.waitReady()).toBeTruthy();
        $optioinSelected.click();
    }
}

module.exports = ContactUsMenus;