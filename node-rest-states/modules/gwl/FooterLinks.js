/* eslint-env jasmine, protractor */

const $heroTitle = $('h1.hero-title');

class FooterLinks {

    VerifyFLink(footerLink, textToVerify) {

        const $footerParagraphTxt = $('p.footer-copyright');

        expect(footerLink.waitReady()).toBeTruthy();
        footerLink.click();
        browser.sleep(1200);
        expect($footerParagraphTxt.waitReady()).toBeTruthy();
        expect($footerParagraphTxt.getText()).toEqual('© Great-West Life 2018');
        expect($heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => $heroTitle.getText().then(value =>
            //console.log(value)));  // only use to T-shoot
            value === textToVerify));
        expect($heroTitle.getText()).toEqual(textToVerify);
    };


    verifySocialLink(socialLink, expectedUrl) {
        expect(socialLink.waitReady()).toBeTruthy();

        socialLink.click().then(function () {
            browser.getAllWindowHandles().then(function (handles) {
                const newTabHandle = handles[1];
                browser.switchTo().window(newTabHandle).then(function () {
                    expect(browser.getCurrentUrl()).toEqual(expectedUrl);
                    console.log('new link  now');
                });
            });
        });
    }
}

module.exports = FooterLinks;