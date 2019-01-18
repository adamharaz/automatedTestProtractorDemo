/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const BurgerMenuPage = require('../../page_objects/careers/BurgerMenuPage.js');
const MenuPage = new BurgerMenuPage();

class BurgerMenu {


    verifyBurgerMenuLinks(link, text) {

        expect(MenuPage.$burgerMenuOpenBtn.waitReady()).toBeTruthy();
        MenuPage.$burgerMenuOpenBtn.click();
        //BrowserUtil.clickElementByTxt(`span`, `Menu`);
        browser.sleep(2333);
        BrowserUtil.clickElementByTxt('a', link);
        BrowserUtil.isPageSettled(text);

        // browser.driver.navigate().back();
        browser.driver.get(baseUrl);

        BrowserUtil.isPageSettled(`Discover your opportunity`);
    };
}

module.exports = BurgerMenu;