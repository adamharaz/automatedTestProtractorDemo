/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const Page = require(`../../page_objects/idea/HomePage.js`);


class Home {

    static goHome(heroTitleTxt) {
        const page = new Page();

        expect(page.$homeLink.waitReady()).toBeTruthy();
        page.$homeLink.click();
        browser.sleep(900);

        expect(page.$heroTitle.waitReady()).toBeTruthy();
        browser.wait(() => page.$heroTitle.getText().then(value =>
            value === heroTitleTxt));
        expect(page.$heroTitle.getText()).toBe(heroTitleTxt);
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