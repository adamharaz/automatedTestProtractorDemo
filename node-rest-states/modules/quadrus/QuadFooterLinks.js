/* eslint-env jasmine, protractor */

class QuadFooterLinks {

    static VerifyFooter(footerLink, elementTitle, textToBeVerified, currentUrl) {

        expect(footerLink.waitReady()).toBeTruthy();
        footerLink.click();
        browser.wait(() => elementTitle.getText().then(value =>
            value === textToBeVerified));
        expect(elementTitle.getText()).toBe(textToBeVerified);
        expect(browser.getCurrentUrl()).toEqual(currentUrl);

    };
}

module.exports = QuadFooterLinks;