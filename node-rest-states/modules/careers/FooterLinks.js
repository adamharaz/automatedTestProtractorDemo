/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const FooterPage = require('../../page_objects/careers/FooterPage.js');
const $heroTitle = $('h1.hero-title');
const Footer = new FooterPage();
const $homeBtn = $('a.header-career-title');
const BrowserFacade = require('../../helpers/BrowserFacade.js');

class FooterLinks {

    verifyFooterLink(link, text) {
        if (!text) {
            text = link;
        }
        BrowserUtil.clickElementByTxtMobile('a', link);
        BrowserFacade.isPageSettled();
    };

    verifyCorpSitesLinks(id, text, url) {
        const $footerCorpLink = element(by.xpath('//*[@id="site_footer"]/div[1]/div[2]/div/div[' + id + ']/a/img'));
        ////*[@id="site_footer"]/div[1]/div[2]/div/div[1]/a/img

        expect($footerCorpLink.waitReady()).toBeTruthy();
        $footerCorpLink.click();
        browser.sleep(2222);  //ToDo it takes at least a good second for the external corp site to get rendered.
        // ToDo Thus we need to wait for a second. Though, we need to find a diff solution
        expect(browser.getCurrentUrl()).toBe(url);
        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            value === text));
        expect($heroTitle.getText()).toBe(text);
        browser.driver.get(baseUrl);
        browser.wait(() => $heroTitle.getText().then(value =>
            value === 'Discover your opportunity'));
        expect($heroTitle.getText()).toBe('Discover your opportunity');
    };
}

module.exports = FooterLinks;