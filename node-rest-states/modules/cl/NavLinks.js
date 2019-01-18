/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $burgerMenu = $$('span[role="presentation"]').get(0);
const $heroTitle = $('h1.hero-title');


class NavLinks {
    verifyHamburgerLinks(txt, id, naviagetBack, navigateBackTxt) {
        const link = element(by.xpath(`//*[@id="nav-mobilenav"]/ul/li[${id}]/a`));

        expect($burgerMenu.waitReady()).toBeTruthy();
        $burgerMenu.click();
        expect(link.waitReady()).toBeTruthy();
        link.click();
        browser.sleep(1222);
        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === txt));
        expect($heroTitle.getText()).toBe(txt);

        if (naviagetBack) {
            browser.driver.get(baseUrl);
            if (!navigateBackTxt) {
                browser.wait(() => $heroTitle.getText().then(value =>
                    value === 'Why complicate insurance?'));
                expect($heroTitle.getText()).toBe('Why complicate insurance?');
            } else {
                browser.wait(() => $heroTitle.getText().then(value =>
                    value === navigateBackTxt));
                expect($heroTitle.getText()).toBe(navigateBackTxt);

            }
        }
    };

    verifyLink(link, txt, expectedURL) {
        BrowserUtil.clickElementByTxt('a', link);
        browser.sleep(1200);
        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === txt));
        expect($heroTitle.getText()).toBe(txt);
        expect(browser.getCurrentUrl()).toEqual(expectedURL);
    }
}

module.exports = NavLinks;