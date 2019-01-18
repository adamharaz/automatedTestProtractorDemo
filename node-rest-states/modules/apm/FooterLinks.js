/* eslint-env jasmine, protractor */

class FooterLinks {

    static VerifyFooter(footerLink, elementTitle, textToBeVerified) {

        const $footerParagraphTxt = $('p.footer-copyright');

        expect(footerLink.waitReady()).toBeTruthy();
        footerLink.click();
        browser.sleep(1200);
        expect($footerParagraphTxt.waitReady()).toBeTruthy();
        expect($footerParagraphTxt.getText()).toEqual('© GLC Asset Management Group Ltd., 2011-2018');
        expect(elementTitle.waitReady()).toBeTruthy();
        browser.wait(() => elementTitle.getText().then(value =>
            //console.log(value)));  // only use to T-shoot
            value === textToBeVerified));
        expect(elementTitle.getText()).toEqual(textToBeVerified);
    };
}

module.exports = FooterLinks;