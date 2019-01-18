/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $burgerMenu = $$('span[role="presentation"]').get(0);
const $heroTitle = $('h1.hero-title');
const $aboutusLink = $('footer.nav-menu-mobile-footer').$$('ul').get(0).$$('li').get(1);


class NavLinks {

    navigateToAboutUsPage() {
        expect($burgerMenu.waitReady()).toBeTruthy();
        $burgerMenu.click();
        BrowserUtil.clickElementByTxt('a', 'About us');
        browser.sleep(1222);
        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === 'About us'));
        expect($heroTitle.getText()).toBe('About us');
    }

    verifyAboutUsCardLinks(cardHeading, txtToVerify) {
        if (!txtToVerify) {
            txtToVerify = cardHeading;
        }
        BrowserUtil.clickElementByTxt('h2.card-heading', cardHeading);
        browser.sleep(900);
        expect($heroTitle.waitReady()).toBeTruthy();
       /* browser.wait(() => $heroTitle.getText().then(value =>
            // console.log(value)));  // only use to T-shoot
            value === txtToVerify));
        expect($heroTitle.getText()).toBe(txtToVerify);*/

        browser.driver.get('https://www.canadalife.com/about-us.html');
        // expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === 'About us'));
        //console.log(value)));  // only use to T-shoot
        expect($heroTitle.getText()).toBe('About us');
    };
}

module.exports = NavLinks;