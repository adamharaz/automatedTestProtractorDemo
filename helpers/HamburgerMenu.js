/* eslint-env jasmine, protractor */
const Navgations = require('../page_objects/glc/Navgations.js');
const BrowserUtil = require('./BrowserUtil.js');

class HamburgerMenu {
    //Pass true or false for navigateBack
    static verifyLink(navigateTo, expectedTitle, text, navigateBack) {
        const Nav = new Navgations();
        if (navigateBack) {
            browser.driver.navigate().back();
        }
        expect(Nav.$hamburgerBtn.waitReady()).toBeTruthy();
        Nav.$hamburgerBtn.click();
        expect(navigateTo.waitReady()).toBeTruthy();
        navigateTo.click();
        BrowserUtil.isPageSettled(text, expectedTitle);
    };
}

module.exports = HamburgerMenu;