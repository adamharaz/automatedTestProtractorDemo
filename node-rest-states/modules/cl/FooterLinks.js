/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');

class FooterLinks {
    VerifyFooter(footerLink, heroTitle) {
        const $aboutUsSection = element(by.xpath('//*[@id="site_footer"]/div[1]/div[2]/div/div[1]/ul/li[1]/h3'));
        const $heroTitle = $('h1.hero-title');

        expect($aboutUsSection.waitReady()).toBeTruthy();
        browser.sleep(1200);
        BrowserUtil.clickElementByTxt('a', footerLink);
        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === footerLink));
        expect($heroTitle.getText()).toBe(footerLink);
        browser.navigate().back();
        browser.sleep(1200);
        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === heroTitle));
        expect($heroTitle.getText()).toBe(heroTitle);
    };
}

module.exports = FooterLinks;