/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $heroTitle = $('h1.hero-title');
const QuotePage = require(`../../page_objects/idea/QuotePage.js`);
const $burgerMenu = $(`button[aria-controls="nav-mobilenav"]`);
const $closeBurgerMenu = element(by.xpath(`/html/body/nav/div/div[1]/div[4]/div/button/span[2]/span[1]`));

class BurgerMenu {

    static verifyLink(link, txtToVerify, heroTitleTxt) {
        expect($burgerMenu.waitReady()).toBeTruthy();
        $burgerMenu.click();
        expect($closeBurgerMenu.waitReady()).toBeTruthy();
        BrowserUtil.clickElementByTxt(`a`, link);

        if (!txtToVerify) txtToVerify = link;

        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === txtToVerify));
        expect($heroTitle.getText()).toBe(txtToVerify);

        browser.driver.get(baseUrl);

        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === heroTitleTxt));
        expect($heroTitle.getText()).toBe(heroTitleTxt);
    }
}

module.exports = BurgerMenu;