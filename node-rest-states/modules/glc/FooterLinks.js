/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');

class FooterLinks {

    static VerifyFooter(footerLink, elementTitle, textToBeVerified) {
        const $footerParagraphTxt = $('p.footer-copyright');

        browser.sleep(1222);
        expect(footerLink.waitReady()).toBeTruthy();
        footerLink.click();
        BrowserUtil.isPageSettled(`© GLC Asset Management Group Ltd., 2011-2018`, $footerParagraphTxt);
        BrowserUtil.isPageSettled(textToBeVerified, elementTitle);
        browser.sleep(1222);
    };
}

module.exports = FooterLinks;