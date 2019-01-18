/* eslint-env jasmine, protractor */
const BrowserUtil = require('../../helpers/BrowserUtil.js');
const $burgerMenu = $$('span[role="presentation"]').get(0);
const $heroTitle = $('h1.hero-title');
const QuotePage = require(`../../page_objects/idea/QuotePage.js`);
const page = new QuotePage();

class GetQuote {

    static calcQuote(firstName, dob, gend, tobaccoStat, term, spouse) {

        page.$pageTitle.getText().then((text) => {
            console.log(`here is the title:      ${text}`);
            console.log(dob);

        });
        expect(page.$firstName.waitReady()).toBeTruthy();
        page.$firstName.sendKeys(firstName);
        BrowserUtil.selectOptionFromDropMenuWithParent(page.$dobDay, dob.substring(0, 2));
        BrowserUtil.selectOptionFromDropMenuWithParent(page.$dobMonth, dob.substring(3, 5));
        BrowserUtil.selectOptionFromDropMenuWithParent(page.$dobYear, dob.substring(6, 12));

        page.setGenderRadioBtn(gend).click();
        page.setGenderRadioBtn(gend).click();
        page.setUsedTobacco(tobaccoStat).click();
        page.setCoverage(term).click();
        page.isSpouseIncluded(spouse).click();

        page.$calcBtn.click();

        browser.sleep(900);
        //expect(browser.getCurrentUrl()).toBe(`https://${environment}.canadalifeinsure.ca/amex/term-life-quoter.html`);
        expect(page.$quoteResult.waitReady()).toBeTruthy();
        browser.wait(() => page.$pleasedMessage.getText().then(value =>
            value === `We're pleased to provide you with the following quote:`));
        expect(page.$quoteResult.getText()).toBe(`Quote Results for ${firstName}`);
    };
}

module.exports = GetQuote;