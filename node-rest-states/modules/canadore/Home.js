/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const Page = require(`../../page_objects/amex/HomePage.js`);

class Home {

    static goHome(fr) {
        const page = new Page();

        expect(page.$homeLink.waitReady()).toBeTruthy();
        page.$homeLink.click();
        browser.sleep(900);
        if (!fr) {
            expect(page.$heroTitle.waitReady()).toBeTruthy();
            browser.wait(() => page.$heroTitle.getText().then(value =>
                value === 'Alumni insurance'));
            expect(page.$heroTitle.getText()).toBe('Alumni insurance');
        } else {
            expect(page.$heroTitle.waitReady()).toBeTruthy();
            browser.wait(() => page.$heroTitle.getText().then(value =>
                value === 'Assurance à l’intention des diplômés'));
            expect(page.$heroTitle.getText()).toBe('Assurance à l’intention des diplômés');
        }
    }

    static verifyArticleTitle(articleTitle) {
        const page = new Page();

        expect(page.$articleContentTitle.waitReady()).toBeTruthy();
        browser.wait(() => page.$articleContentTitle.getText().then(value =>
            value === articleTitle));
        expect(page.$articleContentTitle.getText()).toBe(articleTitle);
    }
}

module.exports = Home;